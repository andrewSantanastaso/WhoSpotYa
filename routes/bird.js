const express = require('express')
const router = express.Router()
const birdCtrl = require('../controllers/birds')


router.get('/', birdCtrl.index)
router.get('/new', birdCtrl.newBird)
router.delete('/:id', birdCtrl.deleteBird)
router.put('/:id', birdCtrl.updateBird)
router.post('/', birdCtrl.createBird)
router.get('/:id/edit', birdCtrl.editBird)
router.get('/:id', birdCtrl.showBird)

module.exports = router