const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comments')



router.post('/:birdId', commentCtrl.addComment)
router.delete('/:commentId', commentCtrl.deleteComment)

module.exports = router