require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')

const authRouter = require('./routes/auth')

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

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})