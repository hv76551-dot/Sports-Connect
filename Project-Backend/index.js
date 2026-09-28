require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const http = require('http')
const config = require('./config/config')

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const database = mongoose.connection
database.on('error', error => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected Successfully')
})

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.options('*', cors())
app.use(
  fileUpload({
    useTempFiles: true
  })
)
app.use(express.json())
app.use('/api', routes)

const server = http.createServer(app)

server.listen(config.port, '0.0.0.0', () => {
  console.log(`Server Started at ${config.port}`)
  console.log(`Server accessible at http://192.168.158.165:${config.port}`)
})
