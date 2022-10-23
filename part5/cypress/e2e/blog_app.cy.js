describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Aisha Rooble',
            username: 'Aisha-R',
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
            cy.get('#username').type('Aisha-R')
            cy.get('#password').type('password123')
            cy.get('#login-button').click()

            cy.contains('Aisha Rooble logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('Aisha-R')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')
        })
    })
})