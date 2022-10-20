const { MONGODB_URI, PORT } = require('./utils/config')
const express = require('express')
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
app.use('/api/blogs', blogsRouter)

module.exports = app