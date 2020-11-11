import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { reducers, sagas } from './ducks'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: [ logger, sagaMiddleware ]
})

sagaMiddleware.run(sagas)

export default store
