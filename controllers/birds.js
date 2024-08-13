const Bird = require('../models/bird')
const User = require('../models/user')

const index = async (req, res) => {
    try {
        const allBirds = await Bird.find({}).populate('user')

        res.render('birds/index.ejs', {
            birds: allBirds
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const newBird = (req, res) => {
    res.render('birds/new.ejs')
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
        const currentUser = await User.findById({ _id: req.session.user._id })
        const bird = currentUser.birds._id(req.params.id)
        res.render('/birds/show.ejs', {
            bird: bird
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

module.exports = {
    index, newBird, deleteBird, updateBird, createBird, editBird, showBird
}