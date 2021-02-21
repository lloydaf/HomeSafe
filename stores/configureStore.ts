import { createStore, applyMiddleware, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './modules'

const epicMiddleware = createEpicMiddleware()

export function configureStore(): Store {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  )

  epicMiddleware.run(rootEpic)
  return store
}