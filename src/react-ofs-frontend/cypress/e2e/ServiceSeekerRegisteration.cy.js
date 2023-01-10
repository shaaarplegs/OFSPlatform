
it("Check if login button exists in the landing page", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"] > .ant-menu-title-content') == 'Registeration'
})


it("Click on the registeration button & check if it is possible to register as service seeker", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"]').click()
    cy.get(':nth-child(2) > .ant-btn > span') == 'Register as service seeker'
})

it("Click on the registeration button of service seeker", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"]').click()
    cy.get(':nth-child(2) > .ant-btn').click()
})