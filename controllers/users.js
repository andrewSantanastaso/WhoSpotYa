const User = require('../models/user')


const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('user/index.ejs', {
            user: currentUser,
            birds: currentUser.birds,
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