const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, product.getAll)
router.post('/', auth, product.create)
router.put('/:id', auth, product.update)
router.delete('/:id', auth, product.remove)

module.exports = router
