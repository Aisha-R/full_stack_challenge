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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}