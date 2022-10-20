const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "635100f9b74358cbff630fa3",
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "63510081b74358cbff630f9f",
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: "6350faffc1ae323a4d784a25",
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
    {
        _id: "635100f9b74358cbff630fa3",
        username: "J-Dog",
        name: "John Doe",
        passwordHash: "$2b$10$d0v6C/82gLH19lNUvWiBq.b/5ygwbIB4R9QBfHf8mSwLrFtAKQ.R2",
        blogs: [],
        __v: 0
    },
    {
        _id: "63510081b74358cbff630f9f",
        username: "Jase",
        name: "Jason Doe",
        passwordHash: "$2b$10$17xfKdJAwFUBORNPlcvlHe7qhJ/WlolVUN9qFkhFG97PVzRwpEmBu",
        blogs: [],
        __v: 0
    },
    {
        _id: "6350faffc1ae323a4d784a25",
        username: "Julie",
        name: "Juliet Doe",
        passwordHash: "$2b$10$xn0Gw6X4JITTzsBsEpx/9eiZ3CO/iwoT52vCaAtjeo0pIfrJWPhQ.",
        blogs: [],
        __v: 0
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb }