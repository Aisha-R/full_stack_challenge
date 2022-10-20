const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('total likes', () => {

    test('when list has zero blogs, equals 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    }, 100000)
    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([initialBlogs[0]])
        expect(result).toBe(7)
    }, 100000)

    test('list of many blogs, equals the likes of all combined', () => {
        const result = listHelper.totalLikes(initialBlogs)
        expect(result).toBe(12)
    }, 100000)
})