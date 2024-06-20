describe('User should be able to use the import function', () => {
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-import > a > img').click()
  })

  //it('should be able import an xlsx file ', () => {
  //  const fileName = "MONITORING_SPREADSHEET_TEMPLATE.xlsx"
  //  cy.get('#filetoupload').click()
  //  cy.fixture(fileName, 'binary')
  //  .then(Cypress.Blob.binaryStringToBlob)
  //  .then(fileContent => {
  //      cy.get("input[type='file']").attachFile({ 
  //        fileContent, 
  //        fileName, 
  //        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
  //        encoding:'utf8' })
  //  })
  //  cy.get('#submit').click()
  //  cy.get('#alert').should('contain','File Submitted!')
  //})

  it('should not be able import a not .xlsx file', () => {
    const fileName = "example.json"
    cy.get('#filetoupload').click();
    cy.fixture(fileName).then(fileContent => {
      cy.get("input[type='file']").attachFile({
        fileContent,
        fileName,
        mimeType: 'application/json',
        encoding: 'utf-8'
      })
    })
    cy.get('#submit').click()
    cy.get('#alert').should('contain','File Submitted!')
  })
  
})
