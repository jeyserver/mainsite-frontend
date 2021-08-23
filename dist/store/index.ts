import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './Currencies';
import authReducer from './Auth';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
