const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = (accumulator, blogs) => {
        return accumulator + blogs.likes
    }
    return blogs.reduce(sum, 0)
}

module.exports = {
    dummy,
    totalLikes
}