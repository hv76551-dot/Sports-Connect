const express = require('express')
const SportController = require('../controllers/SportController')
var SportRouter = express.Router()

SportRouter.post('/create', (req, res, next) => {
  SportController.create(req, res, next)
})

SportRouter.get('/getAll', (req, res, next) => {
    SportController.getAllSports(req, res, next)
  })


module.exports = SportRouter
