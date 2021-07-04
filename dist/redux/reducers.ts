import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import domainReducer from './reducers/domainReducer';

const reducers = combineReducers({ auth: authReducer, domain: domainReducer });

export default reducers;
