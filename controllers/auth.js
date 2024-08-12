

const bcrypt = require('bcrypt')

const User = require('../models/user')

const getSignUp = (req, res) => {
    try {
        res.render('auth/sign-up.ejs')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const getSignIn = (req, res) => {
    try {
        res.render('auth/sign-in.ejs')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const signOut = async (req, res) => {
    try {
        await req.session.destroy()
        res.redirect('/')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const postSignUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match');
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);

        res.redirect('/auth/sign-in');
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const postSignIn = async (req, res) => {
    try {

        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        if (!validPassword) {
            return res.send('Login failed. Please try again.');
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        };

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

module.exports = {
    getSignUp, getSignIn, signOut, postSignIn, postSignUp
}