const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../model/User')
const Helper = require('../helper/Helper')

async function run() {
  const [,, emailArg, newPassArg] = process.argv
  if (!emailArg || !newPassArg) {
    console.error('Usage: node scripts/resetPassword.js <email> <newPassword>')
    process.exit(1)
  }
  try {
    await mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
    const user = await User.findOne({ email: emailArg })
    if (!user) {
      console.error('User not found:', emailArg)
      process.exit(2)
    }
    const hashed = await Helper.hashPassword(newPassArg)
    user.password = hashed
    await user.save()
    console.log('Password reset for', emailArg)
  } catch (e) {
    console.error('Error:', e?.message || e)
    process.exit(3)
  } finally {
    await mongoose.disconnect()
  }
}

run()


