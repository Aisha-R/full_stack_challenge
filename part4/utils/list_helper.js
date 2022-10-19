const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = (accumulator, blogs) => {
        return accumulator + blogs.likes
    }
    return blogs.reduce(sum, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const upvotes = blogs.map(blog => {
        return blog.likes
    })

    const maxLikes = Math.max(...upvotes)

    const blog = blogs.find(blog => blog.likes === maxLikes)

    const { title, author, likes } = blog

    return { title, author, likes }
}

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = [...new Set(authors)];
    const count = []

    uniqueAuthors.forEach(author => count.push({author: author, blogs: 0}))

    authors.forEach(author => {
        count.forEach(obj => {
            if (obj.author === author) {
                obj.blogs += 1
            }
        })
    })

    const noOfBlogs = count.map(obj => {
        return obj.blogs
    })

    const maxBlogs = Math.max(...noOfBlogs)

    const author = count.find(obj => obj.blogs === maxBlogs)

    return author
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}