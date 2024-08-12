const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    birds: [{ type: Schema.Types.ObjectId, ref: 'Bird' }],
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const User = mongoose.model('User', userSchema)

module.exports = User