const Comment = require('../models/comment')
const User = require('../models/user')
const Bird = require('../models/bird')




const addComment = async (req, res) => {
    try {
        req.body.user = req.session.user._id

        const comment = await Comment.create(req.body)
        const user = await User.findOne({ _id: req.session.user._id }).populate('birds')
        const bird = await Bird.findById(req.params.birdId)
        comment.user = user._id
        comment.bird = bird._id
        bird.comments.addToSet(comment._id)
        user.comments.addToSet(comment._id)
        await bird.save()
        await user.save()
        await comment.save()
        res.redirect('/birds')
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(req.params)
    }
}

const deleteComment = async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.session.user._id }).populate('comments')

        const foundComment = await Comment.findByIdAndDelete(req.params.commentId)

        await currentUser.save()
        res.redirect('back')

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = { addComment, deleteComment }