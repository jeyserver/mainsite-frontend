import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import orderDomainReducer from './reducers/orderDomainReducer';

const reducers = combineReducers({
  auth: authReducer,
  orderedDomains: orderDomainReducer,
});

export default reducers;
