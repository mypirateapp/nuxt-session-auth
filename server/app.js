const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.example'),
})
const express = require('express')
const session = require('express-session')
const passport = require('passport')
require('./passportConfig')
const api = require('./api')

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: process.env.SESSION_SECURE === 'true',
    },
  })
)
app.use(passport.initialize({}))
app.use(passport.session({}))
app.use((req, res, next) => {
  console.log('backend got triggered boys', Date.now())
  next()
})
app.use('/api', api)

module.exports = app
