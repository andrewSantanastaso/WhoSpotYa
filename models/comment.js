const mongoose = require('mogoose')

const commentSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    bird: { type: Schema.Types.ObjectId, ref: 'Birs', required: true }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment