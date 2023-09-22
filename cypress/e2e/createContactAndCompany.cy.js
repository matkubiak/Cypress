/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
const dayjs = require('dayjs')

describe('Parent and branch company test', () => {

    let json_company, json_address

    before('Login and assert', () => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

        cy.generateFixtureCompany()
        cy.generateFixtureContact()
        cy.generateFixtureAddress()

        cy.openHomePage()
        cy.login()
        cy.checkLogin()
        
        cy.fixture('company').then((json) => {
            json_company = json
        })


        cy.fixture('contact').then(json => {
            json_contact = {
                items: json.items.map(e => ({
                    ...e,
                    private_contact_full_name: `${e.private_contact_first_name} ${e.private_contact_last_name}`,
                    company_contact_full_name: `${e.company_contact_first_name} ${e.company_contact_last_name}`
                }))
            }
        })

        cy.fixture('address').then(json => {
            json_address = {
                items: json.items.map(e => ({
                    ...e,
                    company_full_address: `${e.company_address_street}, ${e.company_address_postalcode} ${e.company_address_city} (${e.company_address_state}, ${e.company_address_country}`
                }))
            }
        })
    })

    it('Create new contact', () => {
        
        //Go to the Contacts module
        cy.get('#Contacts')
          .should('be.visible')
          .should('have.value', "Accounts")
          .click()

        cy.get('#AddButton')
          .should('be.visible')
          .click()

        //Checking the visibility of fields on the form
        cy.get('#ComboBox_4d4s6bk')
          .should('be.visible')

        cy.get('#ComboBox_4d4s6bk')
          .should('have.value', json_contact.items[0].company_contact_type)
          .should('be.visible')

        //Creating a contact of the Private person type
        cy.waitUntil(() => cy.get('#SectionActionsDashboardContainerGrid', {timeout: 15000}).then(() => {
          cy.get('#SectionActionsDashboardContainerGrid > div').realHover().find('.t-btn-style-green').click()
          cy.get('#ActivityMiniPageSaveEditButtonButton-textEl').click() }))

        cy.get('#ComboBox_4d4s6bk')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_type)
          .type('{enter}')

        cy.get('#Input_avdnxye')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_first_name)

        cy.get('#Input_5i0r811')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_last_name)

        cy.get('#JobTitle')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_position)

        cy.get('#DateTimePicker_bi3r166')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_birthdate)

        cy.get('#MobilePhone')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_phone_mobile)

        cy.get('#Email')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_email_address)

        cy.save()

        cy.get('#SearchFilter')
          .should('be.visible')
          .type(json_contact.items[0].private_contact_full_name)
          .type('{enter}')

        cy.get('tbody')
          .contains('crt-link', json_contact.items[0].private_contact_full_name)
          .click({ force: true })

        cy.get('#CareerListContainer')
          .should('contain', json_contact.items[0].private_contact_position)

        cy.get('#CareerListContainer')
          .should('contain', dayjs().format('DD.MM.YYYY'));

        //Adding a contact address
        cy.addAddress();
        cy.get('#ComboBox_6naln0o')
          .should('be.visible')
          .type(json_address.items[0].contact_address_country)
          .type('{downarrow}{enter}')

        cy.get('#ComboBox_hgtuyez')
          .should('be.visible')
          .type(json_address.items[0].contact_address_state)
          .type('{downarrow}{enter}')

        cy.get('#Input_42y4ujs')
          .should('be.visible')
          .type(json_address.items[0].contact_address_city)

        cy.get('#Input_gn1pwxj')
          .should('be.visible')
          .type(json_address.items[0].contact_address_street)

        cy.get('#Input_5oamy3o')
          .should('be.visible')
          .type(json_address.items[0].contact_address_postalcode)

        cy.get('input#ComboBox_gfd0ket')
          .should('have.value', json_address.items[0].contact_address_type)

        cy.save()

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].contact_address_type)

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].contact_full_address)

        cy.get('#CloseButton')
          .should('be.visible')
          .click();
        
        //Creating a contact of the Company Employee type
        cy.get('#Input_avdnxye')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_first_name)

        cy.get('#Input_5i0r811')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_last_name)

        cy.get('#JobTitle')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_position)

        cy.get('#DateTimePicker_bi3r166')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_birthdate)

        cy.get('#MobilePhone')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_phone_mobile)

        cy.get('#Email')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_email_address)

        cy.get('#Account')
          .click()
          .type('{downarrow}{enter}')

        cy.save()

        cy.clearSearchField()

        cy.get('#SearchFilter')
          .should('be.visible')
          .type(json_contact.items[0].company_contact_full_name)
          .type('{enter}')

        cy.get('tbody')
          .contains('crt-link', json_contact.items[0].company_contact_full_name)
          .click({ force: true })

        cy.get('#CareerListContainer')
          .should('contain', json_contact.items[0].company_contact_position)

        cy.get('#CareerListContainer')
          .should('contain', dayjs().format('DD.MM.YYYY'))

        //Adding a contact address
        cy.addAddress();
        
        cy.get('#ComboBox_6naln0o')
          .should('be.visible')
          .type(json_address.items[0].contact_address_country)
          .type('{downarrow}{enter}')

        cy.get('#ComboBox_hgtuyez')
          .should('be.visible')
          .type(json_address.items[0].contact_address_state)
          .type('{downarrow}{enter}')

        cy.get('#Input_42y4ujs')
          .should('be.visible')
          .type(json_address.items[0].contact_address_city)

        cy.get('#Input_gn1pwxj')
          .should('be.visible')
          .type(json_address.items[0].contact_address_street)

        cy.get('#Input_5oamy3o')
          .should('be.visible')
          .type(json_address.items[0].contact_address_postalcode)

        cy.get('input#ComboBox_gfd0ket')
          .should('have.value', json_address.items[0].contact_address_type)

        cy.save()

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].contact_address_type)

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].contact_full_address)
    })

    it('Create new account', () => {

        //Go to the Accounts module
        cy.get('#Account')
          .should('be.visible')
          .should('have.value', "Accounts")
          .click()

        cy.get('#AddButton')
          .should('be.visible')
          .click()

        //Creating a account of type Parent
        cy.get('#Input_wel5bnq')
          .should('be.visible')
          .type(json_company.items[0].parent_company_name)

        cy.get('#Input_b1up49e')
          .should('be.visible')
          .type(json_company.items[0].parent_company_nip_eu_vat)

        cy.get('#ComboBox_31keije')
          .should('be.visible')
          .type(json_company.items[0].end_user_company_kind)
          .type('{enter}')

        cy.get('#ComboBox_cgu8ntd')
          .should('be.visible')
          .type(json_company.items[0].parent_company_from_area)
          .type('{enter}')

        cy.get('#ComboBox_wxwy07c')
          .should('be.visible')
          .type(json_company.items[0].parent_company_operated_by)
          .type('{enter}')

        cy.get('#Phone')
          .should('be.visible')
          .type(json_company.items[0].parent_company_phone_mobile)

        cy.get('#EmailInput_gksur0f')
          .should('be.visible')
          .type(json_company.items[0].parent_company_email_address)
        
        cy.save();

        //Adding a account address of the Parent type
        cy.get('#SearchFilter')
          .should('be.visible')
          .click().type(json_company.items[0].parent_company_name)
          .type('{enter}')

        cy.get('tbody')
          .contains('crt-link', json_company.items[0].parent_company_name)
          .click()

        cy.addAddress()

        cy.get('#ComboBox_m5lj45l')
          .should('be.visible')
          .type(json_address.items[0].company_address_country)
          .type('{downarrow}{enter}')

        cy.get('#ComboBox_saric77')
          .should('be.visible')
          .type(json_address.items[0].company_address_state)
          .type('{downarrow}{enter}')

        cy.get('#Input_fsxmo6s')
          .should('be.visible')
          .type(json_address.items[0].company_address_city)

        cy.get('#Input_gl47ggq')
          .should('be.visible')
          .type(json_address.items[0].company_address_street)

        cy.get('#ComboBox_4x3coav')
          .should('be.visible')
          .type(json_address.items[0].company_address_type)
          .type('{downarrow}{enter}')

        cy.get('#Input_uo0ql1b')
          .should('be.visible')
          .type(json_address.items[0].company_address_postalcode)

        cy.save()

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].company_address_type)

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].company_full_address)

        //Creating a account of the Branch type
        cy.get('#GridDetailAddBtn_brz06rb')
          .click()

        cy.get('#Input_b1up49e')
          .should('not.exist')

        cy.get('input#ComboBox_4hz7wtm')
          .should('have.value', json_company.items[0].branch_company_type)

        cy.get('#Input_wel5bnq')
          .should('be.visible')
          .type(json_company.items[0].branch_company_name)

        cy.get('#ComboBox_cgu8ntd')
          .should('be.visible')
          .type(json_company.items[0].branch_company_from_area)
          .type('{enter}')

        cy.get('#ComboBox_wxwy07c')
          .should('be.visible')
          .type(json_company.items[0].branch_company_operated_by)
          .type('{enter}')

        cy.get('#EmailInput_gksur0f')
          .should('be.visible')
          .type(json_company.items[0].branch_company_email_address)

        cy.save()

        cy.back()

        cy.get('#DataGrid_vj9cx97')
          .should('contain', json_company.items[0].branch_company_name)

        cy.back()

        cy.clearSearchField()

        cy.get('#SearchFilter')
          .should('be.visible')
          .type(json_company.items[0].branch_company_name)
          .type('{enter}')

        cy.get('tbody')
          .contains('crt-link', json_company.items[0].branch_company_name)

        //Creating a account of the Foreign type
        cy.get('#ComboBox_yeckv11')
          .click({ force: true })

        cy.get('#ComboBox_4hz7wtm')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_type)
          .type('{enter}')

        cy.get('#Input_wel5bnq')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_name)

        cy.get('#ComboBox_31keije')
          .should('be.visible')
          .type(json_company.items[0].end_user_company_kind)
          .type('{enter}')

        cy.get('input#ComboBox_cgu8ntd')
          .should('be.visible')
          .should('have.value', json_company.items[0].foreign_company_from_area)

        cy.get('#ComboBox_wxwy07c')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_operated_by)
          .type('{enter}')

        cy.get('#Phone')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_phone_mobile)

        cy.get('#EmailInput_gksur0f')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_email_address)

        cy.get('#ComboBox_9eckv11')
          .should('be.visible')
          .click().type('{downarrow}{enter}')

        cy.save()

        cy.back()

        cy.clearSearchField()

        cy.get('#SearchFilter')
          .should('be.visible')
          .type(json_company.items[0].foreign_company_name)
          .type('{enter}')

        cy.get('tbody')
          .contains('crt-link', json_company.items[0].foreign_company_name)
          .click()

        //Adding a account address of the Foreign type
        cy.addAddress()

        cy.get('#ComboBox_m5lj45l')
          .should('be.visible')
          .type(json_address.items[0].company_address_country)
          .type('{downarrow}{enter}')

        cy.get('#ComboBox_saric77')
          .should('be.visible')
          .type(json_address.items[0].company_address_state)
          .type('{downarrow}{enter}')

        cy.get('#Input_fsxmo6s')
          .should('be.visible')
          .type(json_address.items[0].company_address_city)

        cy.get('#Input_gl47ggq')
          .should('be.visible')
          .type(json_address.items[0].company_address_street)

        cy.get('#ComboBox_4x3coav')
          .should('be.visible')
          .type(json_address.items[0].company_address_type)
          .type('{downarrow}{enter}')

        cy.get('#Input_uo0ql1b')
          .should('be.visible')
          .type(json_address.items[0].company_address_postalcode)

        cy.save()

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].company_address_type)

        cy.get('#AddressListContainer')
          .should('contain', json_address.items[0].company_full_address)
    })

    after('Logout', () => {

        cy.logout()
        cy.checkLogout()    
    })
})









