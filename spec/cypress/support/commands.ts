import { placesData } from 'spec/cypress/fixtures'

Cypress.Commands.add('addPlace', () => {
  cy.findByTestId('map-search-input-base').type(placesData[0].name)
  cy.findByTestId('map-search-input-list-item-option-0')
    .click()
    .then(() => placesData[0])
})
