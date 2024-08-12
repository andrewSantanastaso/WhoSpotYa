const User = require('../models/user')
const Bird = require('../models/bird')


const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentUserBirds = await Bird.find({ user: currentUser })
        res.render('user/index.ejs', {
            user: currentUser,
            birds: currentUserBirds,
            comments: currentUser.comments
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const showUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id })
        res.render('/user/show.ejs', {
            user: foundUser
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = { index, showUser }