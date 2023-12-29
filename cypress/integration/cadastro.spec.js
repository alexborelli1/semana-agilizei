/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();



context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // Rotas   GET 200 /getconfig/sodar?sv=200&tid=gda&tv=r20231207&st=env
        cy.server();
        cy.route('POST', '**/getconfig/sodar?sv=**' )
            .as('postSodar');

        cy.visit('Register.html');
        cy.get('input[ng-model="FirstName"]').type(chance.first());
        cy.get('input[ng-model="LastName"]').type(chance.last());
        cy.get('input[ng-model="EmailAdress"]').type(chance.email());
        cy.get('input[ng-model="Phone"]').type(chance.phone({ formatted: false }));
        
        // Checks --> Radios e checkboxes
        cy.get('input[value="FeMale"]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');
        cy.get('select#country').select('Australia', {force: true});
        cy.get('select#Skills').select('Javascript');
        cy.get('select#yearbox').select('1979');
        cy.get('select[ng-model^=monthbox]').select('July');
        cy.get('select#daybox').select('12');
        cy.get('input#firstpassword').type('teste1234');
        cy.get('input#secondpassword').type('teste1234');

        cy.get('input#imagesrc').attachFile('imagem-foto.PNG');        
        
        cy.get('button#submitbtn').click();

        //cy.wait('@postSodar').then((resPostSodar) => {
            //console.log(resPostSodar.status)
            //cy.log(resPostSodar.status)
            //expect(resPostSodar.status).to.eq(200);
        //})
        cy.url().should('contain', 'Register.html');
    });
});