import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import orderDomainReducer from './reducers/orderDomainReducer';
import cartReducer from './reducers/cartReducer';
import domainReducer from './reducers/domainReducer';
import themeReducer from './reducers/themeReducer';

const reducers = combineReducers({ auth: authReducer, theme: themeReducer, domain: domainReducer, cart: cartReducer, orderedDomains: orderDomainReducer });

export default reducers;
