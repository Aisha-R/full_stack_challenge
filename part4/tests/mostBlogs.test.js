const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('most blogs', () => {

    test('when list has zero blogs, equals null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    }, 100000)

    test('when list has only one blog, equals that author of that blog', () => {
        const result = listHelper.mostBlogs([initialBlogs[0]])
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        expect(result).toEqual(expected)
    }, 100000)

    test('list of many blogs, equals the author with most blogs', () => {
        const result = listHelper.mostBlogs(initialBlogs)
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        expect(result).toEqual(expected)
    }, 100000)
})