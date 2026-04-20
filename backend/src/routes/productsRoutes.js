const express = require('express')
const productsController = require('../controllers/productsController')

const router = express.Router()

router.get('/', productsController.list)
router.get('/sales', productsController.listSales)
router.get('/:slug', productsController.getBySlug)

module.exports = router
