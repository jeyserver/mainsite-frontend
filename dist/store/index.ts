import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currencies from './Currencies';
import auth from './Auth';
import language from './Language';
import theme from './Theme';
import domain from './Domain';

export const store = configureStore({
  reducer: persistReducer(
    { key: 'root', version: 1, storage },
    combineReducers({
      currencies,
      auth,
      language,
      theme,
      domain,
    })
  ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AsyncThunkAction<Returned, ThunkArg> = (
  arg: ThunkArg
) => Promise<any> & {
  unwrap: () => Promise<Returned>;
};
