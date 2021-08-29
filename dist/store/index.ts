import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './Currencies';
import authReducer from './Auth';
import languageReducer from './Language';
import themeReducer from './Theme';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
