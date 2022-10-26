const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({username})

    if (existingUser) {
        return response.status(400).json({ error: 'username is taken' })
    }

    if (!(username && password)) {
        return response.status(400).json({ error: 'username and/or password missing' })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: 'username and/or password length must exceed 2 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })

    return response.json(users)
})

module.exports = usersRouter