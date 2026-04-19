const express = require('express')
const verificationController = require('../controllers/verificationController')

const router = express.Router()

router.post('/send', verificationController.send)
router.post('/verify', verificationController.verify)

module.exports = router
