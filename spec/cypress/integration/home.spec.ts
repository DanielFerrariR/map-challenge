import { placesData } from 'spec/cypress/fixtures'

describe('testing home page', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.server()
    cy.route({
      method: 'GET',
      url: /\/name/,
      response: placesData
    })
    cy.route({
      method: 'GET',
      url: /\/region/,
      response: placesData
    })
  })

  describe('testing place search', () => {
    it('should add a place by name', () => {
      cy.findByTestId('map-search-input-base').type(placesData[0].name)
      cy.findByTestId('map-search-input-list-item-option-0').click()

      cy.findByTestId('map-search-input-menu-badge').contains(/1/)

      cy.findByTestId('map-search-input-menu-button').click()

      cy.findAllByTestId('places-modal-list-item-text-0').contains(
        placesData[0].name
      )
    })

    it('should add a place by region', () => {
      cy.route({
        method: 'GET',
        url: /\/region/,
        response: [placesData[1]]
      })
      cy.findByTestId('map-search-input-base').type('europe')
      cy.findByTestId('map-search-input-list-item-option-0').click()

      cy.findByTestId('map-search-input-menu-badge').contains(/1/)

      cy.findByTestId('map-search-input-menu-button').click()

      cy.findAllByTestId('places-modal-list-item-text-0').contains(
        placesData[1].name
      )
    })

    it('should remove a place', () => {
      cy.addPlace().then((placeData) => {
        cy.findByTestId('map-search-input-menu-badge').contains(/1/)

        cy.findByTestId('map-search-input-menu-button').click()

        cy.findAllByTestId('places-modal-list-item-text-0').contains(
          placeData.name
        )

        cy.findAllByTestId('places-modal-icon-button-delete-0').click()

        cy.findAllByTestId('places-modal-list-item-text-0').should('not.exist')
      })
    })

    it('should remove all places', () => {
      cy.findByTestId('map-search-input-base').type(placesData[0].name)
      cy.findByTestId('map-search-input-list-item-option-0').click()
      cy.findByTestId('map-search-input-base').type(placesData[1].name)
      cy.findByTestId('map-search-input-list-item-option-1').click()
      cy.findByTestId('map-search-input-menu-badge').contains(/2/)

      cy.findByTestId('map-search-input-menu-button').click()

      cy.findAllByTestId('places-modal-list-item-text-0').contains(
        placesData[0].name
      )
      cy.findAllByTestId('places-modal-list-item-text-1').contains(
        placesData[1].name
      )

      cy.findAllByTestId('list-reminders-icon-button-delete-all').click()

      cy.findAllByTestId('places-modal-list-item-text-0').should('not.exist')
    })
  })
})
