import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

import rootSaga from '../sagas/rootSaga';

import reducers from './index';

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
