 /// <reference types="cypress" />

 let Chance = require('chance');
 let chance = new Chance();

 context('Cadastro', () => {
     it('Cadastro de usuário no site', () => {
         // rotas
         // GET (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
         // POST (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
         // POST (aborted) /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
         cy.server();
         cy.route({
             method: 'POST',
             url: '**/api/1/databases/userdetails/collections/newtable?**',
             status: 200,
             response: {}
         }).as('postNewtable');
         
         cy.route({
             method: 'GET',
             url: '**/api/1/databases/userdetails/collections/newtable?**',
             status: 200,
             response: {}
         }).as('getNewtable');
         
        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/usertable?**',
            status: 200,
            response: {} 
        }).as('postUsertable');
        
        

         //cy.visit('http://demo.automationtesting.in/')         
         cy.visit('Register.html')

         // type
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

         // Click
         cy.get('button#submitbtn').click();

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
 });


// 
// 
// 
// 
// 





 // Se utilizar ^ procura o que comeca com o conteudo digitado, ex: input[placeholde^="First"] 
 //     e tem o que termina com uma palavra que é o $, ex: input[placeholde^="name"] e se usar o * seria o que tiver esse conteudo, ex: input[placeholder*="st"]