


it("Check if login button exists in the landing page", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 1;"] > .ant-menu-title-content') == 'Login'
})


it("Go to the login page", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 1;"]').click()
})

it("Go to the login page", ()=> {
    cy.visit('http://localhost:3000/')
    cy.get('[style="opacity: 1; order: 1;"]').click()
    cy.origin('https://ofs-auth.auth.eu-west-1.amazoncognito.com', () => {
        cy.get('#signInFormUsername').type(process.env.CYPRESS_E2E_USERNAME, {force: true})
        cy.get('#signInFormPassword').type(process.env.CYPRESS_E2E_PASSWORD, {force: true})
        // cy.get('input[value="Sign in"]').click({ multiple: true })
        cy.get('input[name="signInSubmitButton"]').click({ multiple: true, force:true })
    })
    cy.origin('https://ofs-platform.com/', () => {
        cy.get('span[class="ant-breadcrumb-link"]') == 'Freelancer / Welcome, Mohammed Saleh Said Salem Alharbi'
    })
})

