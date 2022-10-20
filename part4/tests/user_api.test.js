const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialUsers, usersInDb } = require('./test_helper')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
    userObject = new User(initialUsers[2])
    await userObject.save()
})

describe('POST request for invalid users', () => {

    test('existing user, response returns "username is taken"', async () => {

        const newUser = {
            username: "J-Dog",
            name: "Jane Doe",
            password: "password123"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(response.body.error).toBe('username is taken')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)
    })

    test('username missing, response returns "username and/or password missing"', async () => {

        const newUser = {
            username: "",
            name: "Jane Doe",
            password: "password123"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('username and/or password missing')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)
    })

    test('password missing, response returns "username and/or password missing"', async () => {

        const newUser = {
            username: "Jane-D",
            name: "Jane Doe",
            password: ""
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('username and/or password missing')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)
    })

    test('password length is <3, response returns "username and/or password length must exceed 2 characters"', async () => {

        const newUser = {
            username: "Jane-D",
            name: "Jane Doe",
            password: "pa"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('username and/or password length must exceed 2 characters')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)
    })

    test('username length is <3, response returns "username and/or password length must exceed 2 characters"', async () => {

        const newUser = {
            username: "J",
            name: "Jane Doe",
            password: "password123"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('username and/or password length must exceed 2 characters')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})