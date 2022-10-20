const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      
    return response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    
    const user = request.user

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    blog.user = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

    const id = request.params.id

    const user = request.user

    const blog = await Blog.findById(id)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(id)

        return response.status(204).end()
    } else {
        return response.status(401).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const blog = await Blog.findById(id)

    blog.likes += 1

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        
    return response.json(updatedBlog)
})

module.exports = blogsRouter