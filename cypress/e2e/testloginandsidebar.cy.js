describe('User should be able to login', () => {
  it('Should be able to login with the correct credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Admin')
    cy.get('#password').type('12345678')
    cy.get('#login').click()
    cy.get('.Title').should('contain', 'Generate Report')
  })
  it('Should be not be able to login with no username', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#password').type('12345678')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid username' )
  })
  it('Should be not be able to login with no password', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Admin')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid password' )
  })

  it('Should be not be able to login with no input', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid username' )
  })
})

describe('User should be able to interact with the sidebar menu', () => {
  beforeEach(() => {
    cy.login('Admin', '12345678')
  })

  it('should be able to click the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.navbar').should('exist')
  })

  it('should be able to access imports from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-import > a > img').click()
    cy.get('.Title').should('contain', 'Import file')
  })

  it('should be able to access tables from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-table > a > img').click()
    cy.get('.Title').should('contain', 'View table')
  })

  it('should be able to access imports from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-generateReport > a > img').click()
    cy.get('.Title').should('contain', 'Generate Report')
  })
})

