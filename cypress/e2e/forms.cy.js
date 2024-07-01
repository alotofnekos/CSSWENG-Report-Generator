describe('template spec', () => {  
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-generateReport > a > img')
  })
  it('Should be able create a report (Item Quantity per Model) based on the month', () => {
    cy.get('[data-report="IQPM"]').click()
    cy.get(':nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-04')
    cy.get('.centered > .btn-dropdown-mock').select("AGR/MIRACLE 8 ITEM")
    cy.get('.btn-generate-report').click()
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it('Should be able create a report (Item Quantity per Model) based on the quarter', () => {
    cy.get('[data-report="IQPM"]').click()
    cy.get(':nth-child(2) > span').click()
    cy.get('[name="quarterNum"]').select("2nd Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.centered > .btn-dropdown-mock').select("AGR/MIRACLE 8 ITEM")
    cy.get('.btn-generate-report').click()
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it('Should be able create a report (Item Quantity per Model) based on the year', () => {
    cy.get('[data-report="IQPM"]').click()
    cy.get(':nth-child(3) > span').click()
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.centered > .btn-dropdown-mock').select("AGR/MIRACLE 8 ITEM")
    cy.get('.btn-generate-report').click()
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it('Should not be able create a report (Item Quantity per Model) without a date parameter', () => {
    cy.get('[data-report="IQPM"]').click()
    cy.get('.centered > .btn-dropdown-mock').select("AGR/MIRACLE 8 ITEM")
    cy.get('.btn-generate-report').click()
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });
})