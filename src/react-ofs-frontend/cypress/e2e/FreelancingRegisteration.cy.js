
it("Check if login button exists in the landing page", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"] > .ant-menu-title-content') == 'Registeration'
})


it("Click on the registeration button & check if it is possible to register as freelancer", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"]').click()
    cy.get(':nth-child(1) > .ant-btn > span') == 'Register as freelancer'
})

it("Click on the registeration button of freelancer", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 2;"]').click()
    cy.get(':nth-child(1) > .ant-btn').click()
})