const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')

router.get('/sign-in', authCtrl.getSignIn)
router.get('/sign-up', authCtrl.getSignUp)
router.delete('/sign-out', authCtrl.signOut)
router.post('/sign-in', authCtrl.postSignIn)
router.post('/sign-up', authCtrl.postSignUp)

module.exports = router