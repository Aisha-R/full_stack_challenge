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
            cy.contains('login').click()
            cy.get('#username').type('A-Rooble')
            cy.get('#password').type('password123')
            cy.get('#login-button').click()
        })

        it.only('A blog can be created', function () {
            cy.contains('new blog').click()

            cy.get('#title').type('First class tests')
            cy.get('#author').type('Robert C. Martin')
            cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')
            
            cy.contains('create').click()
            
            cy.contains('First class tests')
        })
    })
})