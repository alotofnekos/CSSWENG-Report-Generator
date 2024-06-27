describe('User should be able to edit the items and these edits should reflect in the website', () => {
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-table > a > img').click()
  })
  it.skip('Should be able to change the date', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDate').clear()
    cy.get('#repairDate').type(45390)
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(2) > :nth-child(2) > .col > strong').should('contain', '45390')
  });

  it.skip('Should be able to change the repair PL number', () => {
    cy.get(':nth-child(96) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairPLNumber').clear()
    cy.get('#repairPLNumber').type(20)
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(96) > :nth-child(3) > .col').should('contain', '20')
  });
  it.skip('Should be able to change the customer name', () => {
    cy.get(':nth-child(14) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCustomer').clear()
    cy.get('#repairCustomer').type('Angel')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(14) > :nth-child(4) > .col > strong').should('contain', 'Angel')
  });

  it.skip('Should be able to change the Item Model', () => {
    cy.get(':nth-child(24) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairItemModel').select('FRAME VTX-12')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(24) > :nth-child(5) > .col > strong').should('contain', 'FRAME VTX-12')
  });

  it.skip('Should be able to change the category', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCategory1').select('PRO WOOFERS')
    cy.get('#repairCategory2').clear()
    cy.get('#repairCategory2').type('11')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(38) > :nth-child(10) > .col').should('contain', 'PRO WOOFERS')
    cy.get(':nth-child(38) > :nth-child(11) > .col > strong').should('contain', '11')
  });

  
  it.skip('Should be able to change the quantity', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairQuantity').clear()
    cy.get('#repairQuantity').type('11')
    cy.get('#repairUOM').select('pc')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(38) > :nth-child(7) > .col').should('contain', '11')
    cy.get(':nth-child(38) > :nth-child(8) > .col').should('contain', 'pc')
  });

  it.skip('Should not be able to change the quantity to a negative value', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairQuantity').clear()
    cy.get('#repairQuantity').type('-1')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    //this should throw an error or prevent user from changing it at least
    cy.get(':nth-child(38) > :nth-child(7) > .col').should('contain', '11')
  });

  it.skip('Should be able to change the repair pull out', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairPullOutBy').clear()
    cy.get('#repairPullOutBy').type('mj')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(38) > :nth-child(9) > .col').should('contain', 'mj')
  });

  it.skip('Should be able to change the repair description', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDescription').clear()
    cy.get('#repairDescription').type('Waiting for spare parts')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(38) > :nth-child(6) > .col > strong').should('contain', 'Waiting for spare parts')
  });

  it.skip('Should be able to change the repair serial number and the job order number', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('12345')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('12')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    cy.get(':nth-child(38) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(38) > :nth-child(13) > .col > strong').should('contain', '12')
  });

  it.skip('Should not be able to change the repair serial number and the job order to non-numbers', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('a')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('b')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    //This should throw an error
    cy.get(':nth-child(38) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(38) > :nth-child(13) > .col > strong').should('contain', '12')
  });

  it('Should not be able to change the repair serial number and the job order to non-numbers', () => {
    cy.get(':nth-child(38) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('a')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('b')
    cy.get('[formaction="/update"]').click()
    cy.reload()
    //This should throw an error
    cy.get(':nth-child(38) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(38) > :nth-child(13) > .col > strong').should('contain', '12')
  });



})