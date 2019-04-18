describe('Login', function() {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Eetu',
            username: 'eetuh',
            password: 'helloworld'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3000');
    })
    it('front page can be opened', function() {
        cy.contains('Blogs');
    });

    it('try to log in', function() {
        cy.get('input:first')
            .type('eetuh')
        cy.get('input:last')
            .type('helloworld')
        cy.contains('Kirjaudu')
            .click();
        cy.contains('Eetu logged in');
    });
});

describe('Create blog', function() {
    it('create blog', function() {
        cy.contains('create new').click();
        cy.get('#title').type('HelloWorld!');
        cy.get('#author').type('Eetu Häkkinen');
        cy.get('#url').type('www.helloworld.com');
        cy.contains('create').click();
    });

    it('check that creation success', function() {
        cy.contains('HelloWorld! Eetu Häkkinen');
    });
});

describe('blogs and users', function(){
    it('clickblog', function() {
        cy.contains('helloWorld').click();
        cy.contains('added by Eetu');
    });

    it('clickUser', function() {
        cy.visit('http://localhost:3000/users');
        cy.contains('Eetu').click();
        cy.contains('helloWorld!');
    })
});