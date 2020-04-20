/// <reference types="cypress" />

import listingPageSelectors from "/Users/dgirotti/E2E_tests/cypress/selectors/listing-page";

// COMPLETE BASIC INFO PAGE

export function complete_basic_info_page(EVENT_NAME){
 
    cy.url().should('include', 'manage/events/create');
    cy.get('#musicBasicInfo-title').clear().type(EVENT_NAME).invoke('attr', 'value').should('contain', EVENT_NAME);
    cy.wait(1000)
    cy.get('#BasicInfo-venue').contains('option', 'Testing Venue');

    
    const EVENT_DATE = Cypress.moment().add(10, 'days').add(1, 'month').format('MM/DD/YYYY');

    cy.get('#musicBasicInfo-startDate')
        .invoke('attr', 'value')
        .should('contain', EVENT_DATE);
    
    //save form
    cy.get('[data-spec="event-page-action-save"]')
    .contains('Save & Continue')
    .click();

}

// COMPLETE DETAILS PAGE

export function details_page(){

   cy.url().should('include', '/details');

   cy.get('.eds-image-uploader')
       .should('exist');

   const SUMMARY_TEXT = 'Summary For this event';

   cy.get('[data-automation="coyote-design-event-summary-wrapper"]')
       .should('exist')
       .get('#event-design-description')
       .type(SUMMARY_TEXT)
       .contains(SUMMARY_TEXT);
       
   // save form
   cy.get('[data-spec="event-page-action-save"]')
       .contains('Save & Continue')
       .click();
}

// DIFFERENT TICKETS CREATION (GA - GA-HOLD - EXTERNAL TICKETING)

// GA TICKETS

export function create_ga_tickets(){

    cy.url().should('include', '/tickets');

    cy.contains('General Admission').trigger('mouseover');
    cy.contains('Create Tickets').click();
    cy.wait(5000)
    

    const TICKETS_EMPTY_STATE_TEXT = "Let's create tickets";
    const CREATE_TICKET_BUTTON = 'Create Ticket';

    cy.get('.eds-empty-state__title')
        .should('exist')
        .contains(TICKETS_EMPTY_STATE_TEXT);

    cy.get('button')
        .contains(CREATE_TICKET_BUTTON)
        .click({force: true});
}
 
// COMPLETE TICKET FORM

export function create_ticket_form(){

       cy.url().should('include', '/tickets/create');

       cy.get('[data-spec="eds-structure-drawer-right"]')
           .should('exist');

       cy.get('[data-spec="eds-structure-drawer-header"]').as('createTicketHeader')
       cy.get('.eds-structure__drawer-content').as('createTicketContent')
       cy.get('.eds-fixed-bottom-bar-layout__bar').as('createTicketFooter');

       const ADD_TICKET_TEXT = 'Add Ticket';

       cy.get('@createTicketHeader')
           .should('exist')
           .get('[data-spec="eds-structure-drawer-title"]')
           .contains(ADD_TICKET_TEXT);

       cy.get('@createTicketFooter')
           .should('exist')
           .get('[data-automation="coyote-ticket-form-action-save"]')
           .as('ticketSubmitButton');

        cy.get('@createTicketContent')
           .should('exist')
           .find('.segmented-control-label--checked')
           .contains('Paid')

       const GA_TICKET_DEFAULT_TITLE = 'General Admission';
       const GA_TICKET_NEW_TITLE = 'VIP';

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-title"]')
           .as('ticketTitleInput');

       cy.get('@ticketTitleInput')
           .invoke('attr', 'value')
           .should('contain', GA_TICKET_DEFAULT_TITLE);

       cy.get('@ticketTitleInput')
           .clear()
           .type(GA_TICKET_NEW_TITLE)
           .invoke('attr', 'value')
           .should('contain', GA_TICKET_NEW_TITLE);

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-quantity"]')
           .clear()
           .type('200')
           .invoke('attr', 'value')
           .should('contain', '200');

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-price"]')
           .clear()
           .type('10')
           .invoke('attr', 'value')
           .should('contain', '10');

       cy.get('@ticketSubmitButton')
           .get('[data-automation="coyote-ticket-form-action-save"]')
           .contains('Save')
           .click();
}   


// COUNTRY AND CURRENCY MODAL

export function country_currency(){
    
    cy.wait(6000);

      //cy.get('dialog')
        //.should('exist')
           cy.get('.eds-modal__content__children')
           .should('exist')
           .as('country&CurrencyModal');

       cy.get('@country&CurrencyModal')
           .get('[data-spec="checkout-settings-country-select"]').as('countryInput')
           .get('[data-spec="checkout-settings-currency-select"]').as('currencyInput')
           .get('[data-automation="eds-modal__primary-button"]').as('continueButton');

    cy.wait(6000);

       cy.get('@countryInput')
           .should('exist');

       cy.get('@currencyInput')
           .should('exist');

       cy.get('@continueButton')
           .should('exist')
           .click();  

} 


// EXTERNAL TICKETING TICKETS

export function create_et_tickets(){
    
    const startDate = Cypress.moment().format('MM/DD/YYYY')
    const ticket_provider = 'Eventbrite'
    const url_link = 'https://www.eventbrite.com'

    cy.url().should('include', '/tickets');
    cy.contains('External Ticketing').trigger('mouseover');
    cy.contains('Setup External Link').click();
    cy.wait(5000)
   
    cy.get('#externalTicketing-ticketingProvider').clear().type(ticket_provider).invoke('attr', 'value').should('contain',ticket_provider);
    cy.get('#externalTicketing-purchaseUrl',).type(url_link).invoke('attr', 'value').should('contain',url_link);
    cy.get('#externalTicketing-singlePrice').clear().type('10').invoke('attr', 'value').should('contain', '10');
    cy.get('#externalTicketing-maxPrice').clear().type('50').invoke('attr', 'value').should('contain', '50');;
    
    cy.get('#externalTicketing-startDate')
    .invoke('attr', 'value')
    .should('contain', startDate);

    cy.contains('Save').click();
}


// GA HOLDS SECTION

export function create_ga_holds_tickets(){

    cy.url().should('include', '/tickets');
    cy.contains('General Admission').trigger('mouseover');
    cy.contains('Create Tickets').click();
    cy.wait(5000)
    
    const TICKETS_EMPTY_STATE_TEXT = "Let's create tickets";
    const CREATE_SECTION_LINK = 'Create a section';

    cy.get('.eds-empty-state__title')
        .should('exist')
        .contains(TICKETS_EMPTY_STATE_TEXT);

   
    // CREATE A SECTION
    
    const section_name = 'VIP'
    const section_capacity= '500'
    cy.get('#create-section-link')
        .contains(CREATE_SECTION_LINK)
        .click({force: true});
    cy.url().should('include', '/tickets#');
    cy.get('#sectionName').type(section_name).invoke('attr', 'value').should('contain',section_name);
    cy.get('#sectionCapacity').type(section_capacity).invoke('attr', 'value').should('contain',section_capacity);
    cy.get('.eds-modal__button-bar__primary-secondary > .eds-btn--fill').click();

    // CREATE A TICKET INSIDE THE SECTION

    cy.wait(5000);

    cy.url().should('include', '/tickets#');

    cy.wait(5000);

    cy.get('.add-ticket-type__container > .eds-btn--button').click();

    create_ticket_form() 
    //country_currency()  

    cy.url().should('include', '/tickets');

}

// CREATE A HOLD TICKET

export function create_hold_ticket(){

    const hold_name = 'ARTIST'
    const hold_capacity= '5'
    const access_code= 'code'
    const discount= '50'
    cy.contains('Hold').click();
    cy.wait(2000);
    cy.url().should('include', '/holds');
    
    cy.wait(3000);

    cy.get('.eds-show-up-md > .eds-btn').click();
    cy.get('#hold-name').type(hold_name).invoke('attr', 'value').should('contain',hold_name);
    cy.get('#hold-quantity-name').type(hold_capacity).invoke('attr', 'value').should('contain',hold_capacity);
    cy.get('.eds-g-cell > .eds-btn').click();
    cy.wait(3000);
    cy.get('.eds-btn--link').click();
    cy.get('.hold-code-drawer-title__text > p').should('have.text', 'Edit Hold')

    //ADD A PROMO CODE TO A HOLD TICKET

    cy.get('.eds-l-pad-vert-3 > .eds-btn--button').click();
    cy.wait(2000);
    cy.get('#access-code').type(access_code).invoke('attr', 'value').should('contain',access_code);
    cy.get('#discount-percent').type(discount).invoke('attr', 'value').should('contain',discount);
    cy.get('.eds-g-cell > .eds-btn').click();
    cy.wait(2000);
    cy.get('.eds-g-cell > .eds-btn').click();   // me trae el formulario de hold vacio. 
    cy.wait(3000);
    cy.url().should('include', '/holds');
    cy.wait(2000);
    cy.get('.eds-g-cell-2-12 > .eds-text--right').should('have.text','1');


}

// CREATE A HIDDEN TICKET

export function hidden_ticket(){

    create_ga_tickets()

    cy.url().should('include', '/tickets/create');

       cy.get('[data-spec="eds-structure-drawer-right"]')
           .should('exist');

       cy.get('[data-spec="eds-structure-drawer-header"]').as('createTicketHeader')
       cy.get('.eds-structure__drawer-content').as('createTicketContent')
       cy.get('.eds-fixed-bottom-bar-layout__bar').as('createTicketFooter');

       const ADD_TICKET_TEXT = 'Add Ticket';

       cy.get('@createTicketHeader')
           .should('exist')
           .get('[data-spec="eds-structure-drawer-title"]')
           .contains(ADD_TICKET_TEXT);

       cy.get('@createTicketFooter')
           .should('exist')
           .get('[data-automation="coyote-ticket-form-action-save"]')
           .as('ticketSubmitButton');

       /*cy.get('@createTicketContent')
           .should('exist')
           .find('.segmented-control-label--checked')
           .contains('Paid')*/

       const GA_TICKET_DEFAULT_TITLE = 'General Admission';
       const GA_TICKET_NEW_TITLE = 'VIP';

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-title"]')
           .as('ticketTitleInput');

       cy.get('@ticketTitleInput')
           .invoke('attr', 'value')
           .should('contain', GA_TICKET_DEFAULT_TITLE);

       cy.get('@ticketTitleInput')
           .clear()
           .type(GA_TICKET_NEW_TITLE)
           .invoke('attr', 'value')
           .should('contain', GA_TICKET_NEW_TITLE);

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-quantity"]')
           .clear()
           .type('200')
           .invoke('attr', 'value')
           .should('contain', '200');

       cy.get('@createTicketContent')
           .get('[data-automation="coyote-ticketform-price"]')
           .clear()
           .type('10')
           .invoke('attr', 'value')
           .should('contain', '10');

        cy.get(':nth-child(3) > .eds-field-styled__border-simulation > .eds-field-styled__internal > .eds-field-styled__input-container > .eds-field-styled__select-wrapper > .eds-field-styled__input').select('Hidden')
        
        cy.get('@ticketSubmitButton')
           .get('[data-automation="coyote-ticket-form-action-save"]')
           .contains('Save')
           .click();
}   
    
// PUBLISH THE EVENT

export function publish_event(){
      
        cy.wait(10000);
        cy.contains('Publish Event').trigger('mouseover');
        cy.contains('Publish Now').click();
        
}

// CLOSE FACEBOK POP UP  

export function close_publish_popup(){

    cy.wait(5000);
    cy.get('.eds-modal__container')  //data-spec="eds-modal__main"
            .should('exist')    
            .get('.eds-modal__content__children')
            .should('exist')
            .as('Congratulations');

    cy.get('@Congratulations')
    .get('[data-automation="modal-close-button"]').as('close');
    cy.get('@close').should('exist').click();
    cy.wait(2000);
}  

// NAVIGATE TO EVENTS PAGE
export function swith_to_event_page(){

    cy.wait(2000);
    cy.contains('Switch Event').click();
    cy.url().should('include', '/organizations/events');
    
}

// CLOSE CONGRATULATION POP UP  

/*export function close_et_publish_popup(){

    cy.wait(5000);
    cy.get('.eds-modal__container')  //data-spec="eds-modal__main"
            .should('exist')    
            .get('.eds-modal__content__children')
            .should('exist')
            .as('Congratulations');

    cy.get('@Congratulations')
    .get('[data-automation="modal-close-button"]').as('close');
    cy.get('@close').should('exist').click();
    cy.wait(2000);
    

    //cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'On Sale');
     

}*/

//CHANGE EVENT STATUS TO CANCELED

export function change_status_to_canceled(){

    cy.wait(2000);
    cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'On Sale');
    cy.contains('On Sale').trigger('mouseover');
    cy.contains('Change Status').click();
    cy.wait(3000);
    cy.get('#statusCode').select('Canceled');
    cy.contains('Take Off Sale').click();
    cy.wait(3000); 
    cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'Canceled');
}

//CHANGE EVENT STATUS TO POSTPONED

export function change_status_to_postponed(){

    cy.wait(2000);
    cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'On Sale');
    cy.contains('On Sale').trigger('mouseover');
    cy.contains('Change Status').click();
    cy.wait(3000);
    cy.get('#statusCode').select('Postponed');
    cy.contains('Take Off Sale').click();
    cy.wait(3000); 
    cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'Postponed');
}


// LOG OUT OF EVBQA.COM

export function logout(USER_NAME){

    cy.contains(USER_NAME).trigger('mouseover');//Selecciona en el header para mostrar las opciones del log out

    cy.contains("Log out").click();

    cy.url().should('include', '/signin');
 
}


// LISTING PAGE OF THE EVENT

export function listing_page(){
    cy.location().then((location) => {
        const eventId = location.pathname.match(new RegExp('/events/(.*)/tickets'))[1];
        publish_event();
        close_publish_popup();
        cy.visit(`/e/${eventId}`);
        
    })
}

// LISTING PAGE OF CANCELED EVENT

export function canceled_listing_page(){
    cy.location().then((location) => {
        const eventId = location.pathname.match(new RegExp('/events/(.*)/tickets'))[1];
        publish_event();
        close_publish_popup();
        change_status_to_canceled();
        cy.wait(2000);
        cy.visit(`/e/${eventId}`);
        
    })
}

// LISTING PAGE OF POSTPONED EVENT

export function postponed_listing_page(){
    cy.location().then((location) => {
        const eventId = location.pathname.match(new RegExp('/events/(.*)/tickets'))[1];
        publish_event();
        close_publish_popup();
        change_status_to_postponed();
        cy.wait(2000);
        cy.visit(`/e/${eventId}`);
        
    })
}

// LISTING PAGE OF UNAVAILABLE EVENT

export function unavailable_listing_page(){
    cy.location().then((location) => {
        const eventId = location.pathname.match(new RegExp('/events/(.*)/tickets'))[1];
        publish_event();
        close_publish_popup();
        cy.wait(2000);
        cy.get(':nth-child(1) > :nth-child(1) > document-fragment > .eds-dropdown-menu > .eds-dropdown-menu__link > .eds-dropdown-menu__contents').should('have.text', 'Unavailable');
        cy.visit(`/e/${eventId}`);
        
    })
}


   
// VERIFY THAT DATA IS DISPLAYED PROPERLY ON LISTING PAGE
    
export function listing_validations(EVENT_NAME){

        cy.get(listingPageSelectors.externalTicketButton).should('contain', 'Tickets');
        cy.get(listingPageSelectors.eventMusicProps)
        .should('contain', EVENT_NAME)
        .should('contain', 'ALL AGES');
        

}

export function listing_canceled_verification(){

    cy.get(listingPageSelectors.externalTicketButton).should('contain', 'Details');
    cy.get(listingPageSelectors.eventlistingstatus).should('contain', 'Canceled');

}

export function listing_postponed_verification(){

    cy.get(listingPageSelectors.externalTicketButton).should('contain', 'Details');
    cy.get(listingPageSelectors.eventlistingstatus).should('contain', 'Postponed');

}

export function listing_unavailable_verification(){

    cy.get(listingPageSelectors.eventlistingstatus).should('contain', 'Unavailable');

}