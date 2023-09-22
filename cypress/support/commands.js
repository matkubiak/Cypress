Cypress.Commands.add('openHomePage', () => {
    cy.visit('/')
})

Cypress.Commands.add('login', () => {
    cy.get('#loginEdit-el').type('Supervisor');
    cy.get('#passwordEdit-el').type('Supervisor');
    cy.get('#t-comp17-textEl').click();

})

Cypress.Commands.add('checkLogin', () => {
    cy.wait(15000)
    cy.get('#GreetingLabel').should('contain', 'Hello')
})

Cypress.Commands.add('logout', () => {
    cy.get('.mat-button-wrapper').contains('S').click()
    cy.get('[data-item-marker="Exit"]').click()
})

Cypress.Commands.add('checkLogout', () => {
    cy.get('#t-comp3').contains('Username')
})

Cypress.Commands.add('goToListPage', () => {
    cy.get('#t-comp3').contains('Username')
})

Cypress.Commands.add('save', () => {
    cy.get('#SaveButton').click();
})

Cypress.Commands.add('back', () => {
    cy.get('#BackButton').click();
})

Cypress.Commands.add('addAddress', () => {
    cy.get('#AddressAddButton').click();
})

Cypress.Commands.add('clearSearchField', () => { 
    cy.get('#SearchFilter .crt-clear-icon > svg').click();     
})


Cypress.Commands.add('generateFixtureCompany', () => {

    const { faker } = require('@faker-js/faker');

    let rand = function(min, max) {
        return min + Math.floor((max - min) * Math.random());
    };

    let generateNip = function() {
        let taxOfficeId = rand(1,10).toString(10) + rand(1, 10).toString(10) + rand(1, 10).toString(10);
        let rest = ('000000' + rand(0, 1000000).toString(10)).slice(-6);
        let rawNip = taxOfficeId + rest;

        let weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        let sum = 0, i;

        for (i = 0; i < weights.length; i += 1) {
            sum += weights[i] * (+rawNip.charAt(i));
        }

        sum = sum % 11;

        if (sum === 10) {
            // valid NIP cannot have control sum equal 10
            return generateNip();
        }
        else {
            return rawNip + sum.toString(10);
        }
    };

    const nip = generateNip()
    
    cy.writeFile('cypress/fixtures/company.json', {
        'items': Cypress._.times(1, () => {

            return {

                'parent_company_type': `${faker.helpers.arrayElement(['Firma nadrzędna'])}`,
                'parent_company_name': `${faker.company.name()}`,
                'parent_company_nip_eu_vat': nip,
                'parent_company_phone_mobile': `${faker.phone.number('401######')}`,
                'parent_company_email_address': `${faker.internet.email()}`,
                'parent_company_from_area': `${faker.helpers.arrayElement(['ASTOR Katowice'])}`,
                'parent_company_operated_by': `${faker.helpers.arrayElement(['ASTOR Katowice'])}`,

                'branch_company_type': `${faker.helpers.arrayElement(['Oddział / Wydział / Zakład'])}`,
                'branch_company_name': `${faker.company.name()}`,
                'branch_company_phone_mobile': `${faker.phone.number('501######')}`,
                'branch_company_email_address': `${faker.internet.email()}`,
                'branch_company_from_area': `${faker.helpers.arrayElement(['ASTOR Katowice'])}`,
                'branch_company_operated_by': `${faker.helpers.arrayElement(['ASTOR Katowice'])}`,

                'foreign_company_type': `${faker.helpers.arrayElement(['Firma zagraniczna'])}`,
                'foreign_company_name': `${faker.company.name()}`,
                'foreign_company_phone_mobile': `${faker.phone.number('601######')}`,
                'foreign_company_email_address': `${faker.internet.email()}`,
                'foreign_company_from_area': `${faker.helpers.arrayElement(['Firma zagraniczna'])}`,
                'foreign_company_operated_by': `${faker.helpers.arrayElement(['ASTOR Katowice'])}`,

                'end_user_company_kind': `${faker.helpers.arrayElement(['End User'])}`,
                
            }
        })
    })
})


Cypress.Commands.add('generateFixtureContact', () => {

    const { faker } = require('@faker-js/faker');

    cy.writeFile('cypress/fixtures/contact.json', {
        'items': Cypress._.times(1, () => {
            
            return {

                'private_contact_type': `${faker.helpers.arrayElement(['Osoba prywatna'])}`,
                'private_contact_first_name': `${faker.person.firstName()}`,
                'private_contact_last_name': `${faker.person.lastName()}`,
                'private_contact_phone_mobile': `${faker.phone.number('701######')}`,
                'private_contact_email_address': `${faker.internet.email()}`,
                'private_contact_position': `${faker.person.jobArea()}`,
                'private_contact_birthdate': `${faker.date.birthdate({ min: 18, max: 65, mode: 'age'}).toLocaleDateString('pl')}`,

                'company_contact_type': `${faker.helpers.arrayElement(['Pracownik firmy'])}`,
                'company_contact_first_name': `${faker.person.firstName()}`,
                'company_contact_last_name': `${faker.person.lastName()}`,
                'company_contact_phone_mobile': `${faker.phone.number('801######')}`,
                'company_contact_email_address': `${faker.internet.email()}`,
                'company_contact_position': `${faker.person.jobArea()}`,
                'company_contact_birthdate': `${faker.date.birthdate({ min: 18, max: 65, mode: 'age'}).toLocaleDateString('pl')}`
            }
        })
    })
})


Cypress.Commands.add('generateFixtureAddress', () => {

    const { faker } = require('@faker-js/faker');

    cy.writeFile('cypress/fixtures/address.json', {
        'items': Cypress._.times(1, () => {

            return {

                'contact_address_type': `${faker.helpers.arrayElement(['Home page'])}`,
                'contact_address_country': `${faker.helpers.arrayElement(['Polska'])}`,
                'contact_address_state': `${faker.helpers.arrayElement(['wielkopolskie', 'mazowieckie', 'zachodniopomorskie'])}`,
                'contact_address_city': `${faker.helpers.arrayElement(['Warszawa', 'Poznań', 'Wrocław', 'Gdańsk'])}`,
                'contact_address_postalcode': `${faker.location.zipCode('##-###')}`,
                'contact_address_street': `${faker.location.street()}`,

                'company_address_type': `${faker.helpers.arrayElement(['Fakturowania'])}`,
                'company_address_country': `${faker.helpers.arrayElement(['Polska'])}`,
                'company_address_state': `${faker.helpers.arrayElement(['wielkopolskie', 'mazowieckie', 'zachodniopomorskie'])}`,
                'company_address_city': `${faker.helpers.arrayElement(['Warszawa', 'Poznań', 'Wrocław', 'Gdańsk'])}`,
                'company_address_postalcode': `${faker.location.zipCode('##-###')}`,
                'company_address_street': `${faker.location.street()}`
            }
        })
    })
})

