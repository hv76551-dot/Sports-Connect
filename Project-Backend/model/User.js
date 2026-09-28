const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    profile: { type: String, default: null },
    gender:{type:String,default:""},
    token: { type: String, default: null }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
