const express = require('express')
const UserAuthController = require('../controllers/UserAuthController')
const Auth = require('../middleware/AuthenticateUser')
var AuthRouter = express.Router()

AuthRouter.post('/auth/register', (req, res, next) => {
  UserAuthController.register(req, res, next)
})

AuthRouter.post('/auth/login', (req, res, next) => {
  UserAuthController.login(req, res, next)
})

AuthRouter.get('/auth/getById', Auth, (req, res, next) => {
  UserAuthController.getDetailById(req, res, next)
})

AuthRouter.post('/uploadImage', (req, res, next) => {
  UserAuthController.uploadImage(req, res, next)
})

AuthRouter.post('/auth/updateProfile',Auth, (req, res, next) => {
  UserAuthController.updateProfile(req, res, next)
})

AuthRouter.post('/auth/changepassword',Auth, (req, res, next) => {
  UserAuthController.changePassword(req, res, next)
})

module.exports = AuthRouter
