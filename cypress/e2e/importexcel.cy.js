describe('User should be able to use the import function', () => {
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-import > a > img').click()
  })

  it('should be able import an xlsx file ', () => {
    const fileName = "MONITORING_SPREADSHEET_TEMPLATE.xlsx"
    cy.get('#filetoupload').click()
    cy.fixture(fileName, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
        cy.get("input[type='file']").attachFile({ 
          fileContent, 
         fileName, 
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
          encoding:'utf8' })
    })
  cy.get('#submit').click()
  cy.wait(480000); // Wait for 8 minutes
  });
  
  it('All of the records should be inserted properly', () => {
      cy.get('#CompanyLogo > img').click()
      cy.get('.Btn-table > a > img').click()
      cy.get('tbody') 
        .children()
        .should('have.length', 2001); // Each row has 2 length
  });
  it('All of the records should be inserted correctly', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-table > a > img').click()
    cy.get(':nth-child(2000) > :nth-child(1) > .col > strong > .idNum').should('exist')
    cy.get(':nth-child(2000) > :nth-child(4) > .col > strong').should('contain', 'Liam')
  });


//it('should not be able import a not .xlsx file', () => {
//    const fileName = "example.json"
//    cy.get('#filetoupload').click();
//    cy.fixture(fileName).then(fileContent => {
//      cy.get("input[type='file']").attachFile({
//        fileContent,
//        fileName,
//        mimeType: 'application/json',
//      encoding: 'utf-8'
//      })
//    })
//    cy.get('#submit').click()
//    cy.get('#alert').should('contain','File Submitted!')
//  })
//  
})
