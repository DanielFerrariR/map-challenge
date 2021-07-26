export type PlacesState = {
  id: string
  name: string
  latlng: [number, number]
  population: number
}[]

export const ADD_PLACE = 'ADD_PLACE'

export const REMOVE_PLACE = 'REMOVE_PLACE'

export const REMOVE_ALL_PLACES = 'REMOVE_ALL_PLACES'

export interface AddPlaceAction {
  type: typeof ADD_PLACE
  payload: PlacesState
}

export interface RemovePlaceAction {
  type: typeof REMOVE_PLACE
  payload: PlacesState
}

export interface RemoveAllPlacesAction {
  type: typeof REMOVE_ALL_PLACES
  payload: PlacesState
}

export type PlacesActionTypes =
  | AddPlaceAction
  | RemovePlaceAction
  | RemoveAllPlacesAction
