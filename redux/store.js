import { createStore, applyMiddleware } from 'redux';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

import { createLogger } from 'redux-logger';
import  createSagaMiddleware from 'redux-saga';

const sagaMilddeware = createSagaMiddleware();
const logger = createLogger();

const middlewares = [ sagaMilddeware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMilddeware.run(rootSaga);

export default store;

