const Helper = {}

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')
cloudinary.v2.config({
  cloud_name: 'dpum3gi08',
  api_key: '694888842614358',
  api_secret: 'GiYyPD8hWVTiaY18yG7SSmyeZ6I',
  secure: true
})
const nodemailer = require('nodemailer')
const config = require('../config/config')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abc@gmail.com',
    pass: '1234567890'
  }
})

Helper.response = (status, message, data = [], res, statusCode) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data
  })
}

Helper.hashPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

Helper.comparePassword = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword)
}

Helper.generateToken = async userId => {
  return jwt.sign({ data: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRETIME
  })
}

Helper.ISTTime = d => d.getTime() + 5.5 * 60 * 60 * 1000

Helper.DateFormat = d => Helper.ISTTime(new Date(d))

Helper.currentTimeStamp = () => Helper.ISTTime(new Date())

Helper.createJWTSignAdmin = async data => {
  const token = await jwt.sign({ data: data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRETIME
  })
  return token
}

Helper.photoUpload = async image => {
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: 'Banner',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: 'image'
  })
  // console.log(result);
  return result.secure_url
}

Helper.sendEmail = async (to, subject, htmlContent) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'abc@gmail.com',
      to: to,
      subject: subject,
      html: htmlContent
    })

    console.log('Email sent: %s', info.messageId)

    return true // Email sent successfully
  } catch (error) {
    console.error('Error sending email:', error)
    return false // Email sending failed
  }
}

Helper.encrypt = text => {
  let cipher = crypto.createCipheriv(config.algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
}

Helper.decrypt = encrypted => {
  let iv = Buffer.from(encrypted.iv, 'hex')
  let encryptedText = Buffer.from(encrypted.encryptedData, 'hex')
  let decipher = crypto.createDecipheriv(config.algorithm, Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

module.exports = Helper
