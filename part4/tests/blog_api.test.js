const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, blogsInDb, initialUsers } = require('./test_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
})

describe('primarily testing GET requests', () => {

    test('three blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(initialBlogs.length)
    }, 100000)

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    }, 100000)

})

describe('primarily testing POST requests', () => {

    test('new blog created, bloglist lenght increases by 1', async () => {

        const existingUser = {
            username: initialUsers[0].username,
            password: "password123456"
        }

        const response = await api.post('/api/login')
            .send(existingUser)

        const token = "bearer " + response.body.token

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }
        
        await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
            'Canonical string reduction'
        )
    }, 100000)

    test('new blog created without likes field, likes field set to 0', async () => {

        const existingUser = {
            username: initialUsers[0].username,
            password: "password123456"
        }

        const response = await api.post('/api/login')
            .send(existingUser)

        const token = "bearer " + response.body.token

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd[initialBlogs.length].likes).toBe(0)
    }, 100000)

    test('new blog created without title and/or url field, response returns 400 status code', async () => {

        const existingUser = {
            username: initialUsers[0].username,
            password: "password123456"
        }

        const response = await api.post('/api/login')
            .send(existingUser)

        const token = "bearer " + response.body.token

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: ""
        }

        await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(400)

        const newBlog2 = {
            title: "",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog2)
            .expect(400)
    }, 100000)

    test('new blog created without authorization token, response returns status code 401', async () => {

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        const response = await api.post('/api/blogs')
            .set('Authorization', '')
            .send(newBlog)
            .expect(401)

        expect(response.body.error).toBe('invalid token')

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd.length).toBe(initialBlogs.length)
    }, 100000)

})

describe('primarily testing DELETE requests', () => {

    test('delete blog, response returns 204 status code', async () => {

        const existingUser = {
            username: initialUsers[0].username,
            password: "password123456"
        }

        const response = await api.post('/api/login')
            .send(existingUser)

        const token = "bearer " + response.body.token

        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token)
            .send()
            .expect(204)
        
        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    }, 100000)
})

describe('primarily testing PUT requests', () => {

    test('upvote blog, response returns blog with one more like', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
    }, 100000)
})

afterAll(() => {
    mongoose.connection.close()
})