const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comments')



router.post('/:birdId', commentCtrl.addComment)

module.exports = router