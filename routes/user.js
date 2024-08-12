const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')

router.get('/', userCtrl.index)
router.get('/:id', userCtrl.showUser)

module.exports = router