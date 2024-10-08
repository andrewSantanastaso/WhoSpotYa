const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    bird: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment