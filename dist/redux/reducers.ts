import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import domainReducer from './reducers/domainReducer';

const reducers = combineReducers({ auth: authReducer, domain: domainReducer });
import themeReducer from './reducers/themeReducer';

const reducers = combineReducers({ auth: authReducer, theme: themeReducer });

export default reducers;
