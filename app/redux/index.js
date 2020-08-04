import {persistCombineReducers} from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-community/async-storage';

import {reducer as GLOBALReducer} from './GLOBALRedux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['global'],
};

export default persistCombineReducers(persistConfig, {
  global: GLOBALReducer,
});
