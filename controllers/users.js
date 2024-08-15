const User = require('../models/user')
const Bird = require('../models/bird')
const Comment = require('../models/comment')


const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentUserBirds = await Bird.find({ user: currentUser })
        const currentUserComments = await Comment.find({ user: currentUser }).populate('bird', 'name location user').populate('user').populate({ path: 'bird', populate: { path: 'user', model: 'User' } })

        res.render('user/index.ejs', {
            user: currentUser,
            birds: currentUserBirds,
            comments: currentUserComments

        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const showUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id }).populate('birds')
        res.render('user/show.ejs', {
            user: foundUser
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = { index, showUser }