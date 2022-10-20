const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('favourite blog', () => {

    test('when list has zero blogs, equals null', () => {
        const result = listHelper.favouriteBlog([])
        expect(result).toEqual(null)
    }, 100000)

    test('when list has only one blog, equals that blog', () => {
        const result = listHelper.favouriteBlog([initialBlogs[0]])
        const expected = {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
        }
        expect(result).toEqual(expected)
    }, 100000)

    test('list of many blogs, equals the blog with most likes', () => {
        const result = listHelper.favouriteBlog(initialBlogs)
        const expected = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(expected)
    }, 100000)
})