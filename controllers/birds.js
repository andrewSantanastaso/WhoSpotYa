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
        const currentUser = await User.findById({ _id: req.session.user.id })
        currentUser.birds.id(req.params._id).deleteOne()
        await currentUser.save()
        res.redirect('/user')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateBird = async (req, res) => {
    try {
        const currentUser = await User.findByIdAndUpdate({ _id: req.session.user.id })
        const updatedBird = currentUser.birds.id(req.params._id)
        bird.set(req.body)
        await currentUser.save()
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
        const bird = currentUser.birds._id(req.params.id)
        res.render('/birds/edit.ejs', {
            bird: bird
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