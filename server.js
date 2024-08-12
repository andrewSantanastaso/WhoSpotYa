require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(logger('tiny'))
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})