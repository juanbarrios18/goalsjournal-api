// VARIABLES
const createError = require('http-errors')
const express = require('express')
const session = require('./config/session.config')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const PassportLocal = require('passport-local')
const User = require('./models/user')
const app = express()
const cors = require('cors')
require('./config/db.config')

// =====================
//  SERVER CONFIGURATION
// =====================

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// AUTHENTICATION
app.use(session)
passport.use(new PassportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  credentials: true
}))

// GLOBAL USER
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})

// ROUTES
const router = require('./config/routes')
app.use('/', router)

// =====================
//    ERROR HANDLER
// =====================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app
