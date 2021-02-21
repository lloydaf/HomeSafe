import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import { reducers as groups } from './groups'

export const rootEpic = combineEpics(
)

export const rootReducer = combineReducers({
  groups
})