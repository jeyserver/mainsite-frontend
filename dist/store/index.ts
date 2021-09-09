import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currencies from './Currencies';
import auth from './Auth';
import language from './Language';
import domain from './Domain';
import cart from './Cart';

export const store = configureStore({
  reducer: persistReducer(
    { key: 'root', version: 1, storage, blacklist: ['domain'] },
    combineReducers({
      currencies,
      auth,
      language,
      domain,
      cart,
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
