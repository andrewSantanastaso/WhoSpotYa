const Bird = require('../models/bird')
const User = require('../models/user')
const Comment = require('../models/comment')

const index = async (req, res) => {
    try {
        const allBirds = await Bird.find({}).populate({
            path: 'comments', populate: { path: 'user', model: 'User', select: 'username _id' },


        }).populate('user')
        const currentUser = await User.findById({ _id: req.session.user._id })
        res.render('birds/index.ejs', {
            birds: allBirds,
            user: currentUser
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const newBird = async (req, res) => {
    const currentUser = await User.findById({ _id: req.session.user._id })
    res.render('birds/new.ejs', {
        user: currentUser
    })
}

const deleteBird = async (req, res) => {

    try {
        const currentUser = await User.findById({ _id: req.session.user._id })
        const foundBird = await Bird.findByIdAndDelete(req.params.id)
        await currentUser.save()
        res.redirect('/user')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateBird = async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.session.user._id })
        const foundBird = await Bird.findByIdAndUpdate(req.params.id)
        foundBird.set(req.body)

        await foundBird.save()
        res.redirect('/user')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createBird = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        req.body.user = currentUser
        const createdBird = await Bird.create(req.body)
        currentUser.birds.push(createdBird)


        await currentUser.save()
        res.redirect('/user')
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

const editBird = async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.session.user._id })
        req.body.user = currentUser
        const foundBird = await Bird.findById(req.params.id)
        res.render('birds/edit.ejs', {
            bird: foundBird
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

const showBird = async (req, res) => {
    try {
        const foundBird = await Bird.findOne({ _id: req.params.id }).populate({
            path: 'comments', populate: { path: 'user', model: 'User', select: 'username' },


        }).populate('user')

        res.render('birds/show.ejs', {
            bird: foundBird
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

module.exports = {
    index, newBird, deleteBird, updateBird, createBird, editBird, showBird
}