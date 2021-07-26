import { nanoid } from 'nanoid'
import {
  PlacesState,
  ADD_PLACE,
  REMOVE_PLACE,
  REMOVE_ALL_PLACES,
  AddPlaceAction,
  RemovePlaceAction,
  RemoveAllPlacesAction
} from './types'

const addPlace = (
  places: PlacesState,
  data: Omit<PlacesState[0], 'id'>
): AddPlaceAction => {
  const newPlaces = [...places]

  if (places.find((e) => e.name === data.name))
    return {
      type: ADD_PLACE,
      payload: places
    }

  const newPlace = {
    ...data,
    id: nanoid()
  }

  newPlaces.push(newPlace)

  return {
    type: ADD_PLACE,
    payload: newPlaces
  }
}

const removePlace = (places: PlacesState, id: string): RemovePlaceAction => {
  const newPlaces = places.filter((e) => e.id !== id)

  return {
    type: REMOVE_PLACE,
    payload: newPlaces
  }
}

const removeAllPlaces = (): RemoveAllPlacesAction => ({
  type: REMOVE_ALL_PLACES,
  payload: []
})

export { addPlace, removePlace, removeAllPlaces }
