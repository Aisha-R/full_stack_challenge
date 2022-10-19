const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      
    return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const result = await blog.save()

    return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)

    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const blog = await Blog.findById(id)

    blog.likes += 1

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        
    return response.json(updatedBlog)
})

module.exports = blogsRouter