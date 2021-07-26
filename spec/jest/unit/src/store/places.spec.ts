import configureStore from 'redux-mock-store'
import { placesData } from 'spec/jest/fixtures'
import {
  addPlace,
  removePlace,
  removeAllPlaces,
  placesReducer,
  ADD_PLACE,
  REMOVE_PLACE,
  REMOVE_ALL_PLACES,
  PlacesState
} from 'src/store/places'

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => '1')
}))

type Actions = {
  type: string
  payload: any
}[]

describe('testing places state', () => {
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing create credential actions', () => {
    it('should addPlace action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      const newPlace: Omit<PlacesState[0], 'id'> = {
        name: 'London',
        latlng: [39.5, -8],
        population: 10374822
      }

      store.dispatch(addPlace(placesData, newPlace))

      const newPlacesData = [
        ...placesData,
        {
          id: '1',
          ...newPlace
        }
      ]

      let actions = store.getActions() as Actions
      let expectedPayload = {
        type: ADD_PLACE,
        payload: newPlacesData
      }

      expect(actions).toStrictEqual([expectedPayload])

      store.dispatch(addPlace(newPlacesData, newPlace))

      actions = store.getActions() as Actions

      expectedPayload = {
        type: ADD_PLACE,
        payload: newPlacesData
      }

      expect(actions).toStrictEqual([expectedPayload, expectedPayload])
    })

    it('should removePlace action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)
      const id = 'UTdGirEgNgkwpqjt2Ancm'

      store.dispatch(removePlace(placesData, id))

      const newPlacesData = placesData.filter((e) => e.id !== id)

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: REMOVE_PLACE,
        payload: [...newPlacesData]
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should removeAllPlaces action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(removeAllPlaces())

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: REMOVE_ALL_PLACES,
        payload: []
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing reminders reducer', () => {
    it('should return the initial state', () => {
      expect(placesReducer(undefined, {} as any)).toStrictEqual([])
    })

    it('should handle type ADD_PLACE', () => {
      expect(
        placesReducer(undefined, {
          type: ADD_PLACE,
          payload: placesData
        })
      ).toStrictEqual(placesData)
    })

    it('should handle type REMOVE_PLACE', () => {
      expect(
        placesReducer(undefined, {
          type: REMOVE_PLACE,
          payload: placesData
        })
      ).toStrictEqual(placesData)
    })

    it('should handle type REMOVE_ALL_PLACES', () => {
      expect(
        placesReducer(undefined, {
          type: REMOVE_ALL_PLACES,
          payload: placesData
        })
      ).toStrictEqual(placesData)
    })
  })
})
