const express = require('express')
const router = express.Router()
const passport = require('passport')

// MIDDLEWARES / CONTROLLERS
const authMiddleware = require('../middlewares/auth.middleware')
const bulletsController = require('../controllers/bullets.controller')
const authController = require('../controllers/auth.controller')
const goalController = require('../controllers/goals.controller')

// AUTH ROUTES
router.post('/signup', authController.doSignup)
router.post('/login', authController.doLogin)
router.post('/logout', authController.doLogout)

// BULLETS ROUTES
router.get('/bullets/:userid', bulletsController.getAll)
router.get('/bullets/new', bulletsController.new)
router.post('/bullets/new', bulletsController.doNew)
router.get('/bullets/:id/edit', bulletsController.edit)
router.post('/bullets/:id/edit', bulletsController.doEdit)
router.post('/bullets/:id/delete', bulletsController.delete)

// BULLETS VIEWS
router.get('/bullets/month/:month', bulletsController.getMonth)
router.get('/bullets/week/:week', bulletsController.getWeek)
router.get('/bullets/:month/:day', bulletsController.getDay)
router.get('/bullets/:id', bulletsController.getOne)

// GOALS ROUTES
router.get('/goals', goalController.getAll)
router.get('/goals/active', goalController.getActive)
router.get('/goals/completed', goalController.getCompleted)
router.get('/goals/cancelled', goalController.getCancelled)
router.post('/goals/new', goalController.doNew)
router.get('/goals/:id', goalController.getOne)
router.get('/goals/:id/edit', goalController.edit)
router.put('/goals/:id/edit', goalController.doEdit)
router.post('/goals/:id/delete', goalController.delete)

module.exports = router
