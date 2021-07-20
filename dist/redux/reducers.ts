import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import domainReducer from './reducers/domainReducer';
import themeReducer from './reducers/themeReducer';

const reducers = combineReducers({ auth: authReducer, theme: themeReducer, domain: domainReducer, cart: cartReducer });

export default reducers;
