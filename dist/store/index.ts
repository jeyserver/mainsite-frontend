import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './Currencies';
import authReducer from './Auth';
import languageReducer from './Language';
import domainReducer from './Domain';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    auth: authReducer,
    language: languageReducer,
    domain: domainReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AsyncThunkAction<Returned, ThunkArg> = (
  arg: ThunkArg
) => Promise<any> & {
  unwrap: () => Promise<Returned>;
};
