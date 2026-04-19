const express = require('express')
const authController = require('../controllers/authController')
const verificationRoutes = require('./verificationRoutes')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', requireAuth, authController.me)

router.get('/google', authController.googleRedirect)
router.get('/google/callback', authController.googleCallback)

router.use('/verification', verificationRoutes)

module.exports = router
