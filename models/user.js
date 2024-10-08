const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    birds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bird" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

const User = mongoose.model('User', userSchema)

module.exports = User