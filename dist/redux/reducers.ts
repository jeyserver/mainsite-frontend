import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const reducers = combineReducers({ auth: authReducer, cart: cartReducer });

export default reducers;
