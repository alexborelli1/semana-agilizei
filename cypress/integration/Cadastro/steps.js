 /// <reference types="cypress" />

 let Chance = require('chance');
 let chance = new Chance();

When(/^informar os meus dados$/, () => {
	cy.get('input[placeholder="First Name"]').type(chance.first()) ;
	cy.get('input[ng-model^="Last"]').type(chance.last());
	cy.get('input[ng-model^="Email"]').type(chance.email());
	cy.get('input[ng-model^="Phone"]').type(chance.phone( { formatted: false }));

	// check --> radio & checkbox
	cy.get('input[value=FeMale]').check();
	cy.get('input[type=checkbox]').check('Cricket');
	cy.get('input[type=checkbox]').check('Hockey');
	
	// select --> select & select2
	cy.get('select#Skills').select('Android');
	cy.get('select#countries').select('Brazil');
	cy.get('select#country').select('South Africa', { force: true });
	cy.get('select#yearbox').select('2015');
	cy.get('select[ng-model=monthbox]').select('July');
	cy.get('select#daybox').select('12');
	cy.get('input#firstpassword').type('Agilizei@2021');
	cy.get('input#secondpassword').type('Agilizei@2021');
	
	// attachFile --> input file
	cy.get('input#imagesrc').attachFile('imagem-foto-dragon.PNG');
});

When(/^salvar$/, () => {
	cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((resNewtable) => {
		expect(resNewtable.status).to.eq(200)
	 });

	 cy.wait('@postUsertable').then((postUsertable) => {
		 expect(postUsertable.status).to.eq(200)
	 });

	 cy.wait('@getNewtable').then((getUsertable) =>{
		 expect(getUsertable.status).to.eq(200)
	 });

	 cy.url().should('contain', 'WebTable');
});

