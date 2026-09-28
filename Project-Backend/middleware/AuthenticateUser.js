// middleware/AuthenticateUser.js
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../model/User')
const Helper = require('../helper/Helper')
const config = require('../config/config')

const AuthenticateUser = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt
    }
    if (!token) {
      return Helper.response(false, 'No token found', {}, res, 200)
    }
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET)
    const userId = decoded.data
    const user = await User.findById(userId)
    if (!user) {
      return Helper.response(false, 'No user found', {}, res, 200)
    }

    req.user = user
    next()
  } catch (error) {
    Helper.response(false, 'Token expired or invalid', {}, res, 200)
  }
}

module.exports = AuthenticateUser
