const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()

// if "npm run dev", it will create an ID
const sessionSecret = (!process.env.SECRET_SESSION && process.env.NODE_ENV === 'dev') ? uuid() : process.env.SECRET_SESSION

if (!sessionSecret) throw new Error('Env var SECRET_SESSION not found or invalid')

module.exports = session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.SESSION_SECURE || false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  store: new MongoStore({
    useUnifiedTopology: true,
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
    ttl: 24 * 60 * 60 // 1 day
  })
})
