const User = require('../models/user')
const passport = require('passport')

// SIGNUP
module.exports.doSignup = (req, res, next) => {
  console.log('signup req.body: ' + req.body.username)
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      res.status(401).json({ status: 'wrong username or password' })
    }
    passport.authenticate('local')(req, res, function () {
      res.status(200).json({ status: 'signup success' })
    })
  })
}

// LOGIN
module.exports.doLogin = (req, res, next) => {
  res.status(200).json({ status: 'login' })
}

// LOGOUT
module.exports.doLogout = (req, res, next) => {
  req.logout()
  res.status(200).json({ status: 'logout' })
}
