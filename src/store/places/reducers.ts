import {
  PlacesState,
  ADD_PLACE,
  REMOVE_PLACE,
  REMOVE_ALL_PLACES,
  PlacesActionTypes
} from './types'

const initialState: PlacesState = []

const placesReducer = (
  state: PlacesState = initialState,
  action: PlacesActionTypes
): PlacesState => {
  switch (action.type) {
    case ADD_PLACE:
      return action.payload
    case REMOVE_PLACE:
      return action.payload
    case REMOVE_ALL_PLACES:
      return action.payload
    default:
      return state
  }
}

export default placesReducer
