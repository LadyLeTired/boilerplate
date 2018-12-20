if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const db = require('./db')
const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()

// const SequelizeStore = require('connect-session-sequelize')(session.Store)
// const dbStore = new SequelizeStore({ db: db })

//logging middleware
app.use(volleyball)

//static middleware
app.use(express.static(path.join(__dirname, '../public')))

//body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// dbStore.sync();

//Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'super top secret',
  // store: dbStore,
  resave: false,
  saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// authentication router
app.use('/auth', require('./auth/auth'))

//API Routes
app.use('/api', require('./api'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) //send index.html for any other requests

//handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

//error-handling endware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

module.exports = app