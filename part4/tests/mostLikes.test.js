const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('most likes', () => {

    test('when list has zero blogs, equals null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
    }, 100000)

    test('when list has only one blog, equals that author of that blog', () => {
        const result = listHelper.mostLikes([initialBlogs[0]])
        const expected = {
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(expected)
    }, 100000)

    test('list of many blogs, equals the author with most likes', () => {
        const result = listHelper.mostLikes(initialBlogs)
        const expected = {
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(expected)
    }, 100000)
})