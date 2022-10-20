const { MONGODB_URI, PORT } = require('./utils/config')
const middleware = require('./utils/middleware')

const express = require('express')
require('express-async-errors')
const app = express()

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')

const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app