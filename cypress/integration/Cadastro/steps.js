/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {
	cy.server();
        cy.route('POST', '**/getconfig/sodar?sv=**' )
            .as('postSodar');

        cy.visit('Register.html');
});

When(/^informar meus dados$/, () => {
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
});

When(/^Salvar$/, () => {
	cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.url().should('contain', 'Register.html');
});
