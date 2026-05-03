import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import playerReducer from './reducers/player';

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer
});

const store = createStore(rootReducer);

export default store;
