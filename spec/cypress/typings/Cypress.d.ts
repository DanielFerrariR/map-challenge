declare namespace Cypress {
  interface Chainable {
    addPlace(): Chainable<import('src/store/places').PlacesState[0]>
  }
}
