const mongoose = require('mongoose')

const birdSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

})

const Bird = mongoose.model('Bird', birdSchema)

module.exports = Bird