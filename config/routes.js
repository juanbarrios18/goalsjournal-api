const express = require('express')
const router = express.Router()
const passport = require('passport')

// MIDDLEWARES / CONTROLLERS
const authMiddleware = require('../middlewares/auth.middleware')
const bulletsController = require('../controllers/bullets.controller')
const authController = require('../controllers/auth.controller')

// AUTH ROUTES
router.get('/signup', authController.signup)
router.post('/signup', authController.doSignup)
router.get('/login', authController.login)
router.post('/login', passport.authenticate('local'), authController.doLogin)
router.post('/logout', authController.doLogout)

// BULLETS ROUTES
router.get('/bullets', bulletsController.getAll)
router.get('/bullets/new', bulletsController.new)
router.post('/bullets/new', bulletsController.doNew)
router.get('/bullets/:id/edit', bulletsController.edit)
router.post('/bullets/:id/edit', bulletsController.doEdit)
router.post('/bullets/:id/delete', bulletsController.delete)

// BULLETS VIEWS
router.get('/bullets/month/:month', bulletsController.getMonth)
router.get('/bullets/week/:week', bulletsController.getWeek)
router.get('/bullets/:month/:day', bulletsController.getDay)

module.exports = router
