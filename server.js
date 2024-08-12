require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Connected to MONGODB')
})

mongoose.connection.on('error', () => {
    console.log('Error connecting to MONGODB')
})
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(logger('tiny'))
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user
    })
})

app.use(passUserToView)
app.use('/auth', authRouter)
app.use(isSignedIn)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})