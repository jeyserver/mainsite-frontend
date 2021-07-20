import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import themeReducer from './reducers/themeReducer';

const reducers = combineReducers({ auth: authReducer, theme: themeReducer });

export default reducers;
