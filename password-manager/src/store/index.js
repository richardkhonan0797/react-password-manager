import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { userReducer } from './reducers/userReduces'
import { thunk } from './middlewares/thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducers = combineReducers({
    user: userReducer
})

export const store = createStore(rootReducers,composeEnhancers(compose,applyMiddleware(thunk)))