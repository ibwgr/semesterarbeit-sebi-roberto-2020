

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234')
    });


    it('should open Modal for new appointments', () => {
        cy.get('#showModal').click().should('be.visible');
        cy.get('#termin').type("Feuerwehr 19 Uhr")
        .should("have.value", "Feuerwehr 19 Uhr");
        cy.get('#date').type("2020-06-06")
        cy.get('#person').select("Für alle User");
        cy.get('#back').click()
    });

    it('should open Modal for new Users', () => {
        cy.get('#delMod').click().should('be.visible');
        cy.get('#newUser').type("Fritz").should("have.value", "Fritz");

        cy.get('#back2').click()
    });

    it('should navigate next and previous month', () => {
        cy.get('#next').click().should('be.visible');
        cy.get('#prev').click()
    });

    it('should show alert if entry is not valid',  () => {
        cy.get('#showModal').click().should('be.visible');
        cy.get('#saveData').click();
    });

    it('should show alert if user-entry is not valid',  () => {
        cy.get('#delMod');
        cy.get('#saveUser')
    });
});
