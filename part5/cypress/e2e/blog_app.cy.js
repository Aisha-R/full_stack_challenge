describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Aisha Rooble',
            username: 'A-Rooble',
            password: 'password123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('A-Rooble')
            cy.get('#password').type('password123')
            cy.get('#login-button').click()

            cy.contains('Aisha Rooble logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('A-Rooble')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'A-Rooble', password: 'password123' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()

            cy.get('#title').type('First class tests')
            cy.get('#author').type('Robert C. Martin')
            cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')
            
            cy.contains('create').click()
            
            cy.contains('First class tests')
        })
    })

    describe('Like a blog', function () {
        beforeEach(function () {
            cy.login({ username: 'A-Rooble', password: 'password123' })

            cy.createBlog({ title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll' })
            cy.createBlog({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' })
        })

        it('User can like a blog', function () {
            cy.contains('view').click()
            cy.get('#noOfLikes').contains('likes 0')
            cy.get('#likeButton').click()
            cy.get('#noOfLikes').contains('likes 1')
        })

    })
})