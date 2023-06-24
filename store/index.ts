import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from './Storage';
import currencies from './Currencies';
import auth from './Auth';
import language from './Language';
import domain from './Domain';
import cart from './Cart';
import theme from './Theme';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


export const store = configureStore({
  reducer: persistReducer(
    { key: 'root', version: 1, storage, blacklist: ['domain'] },
    combineReducers({
      currencies,
      auth,
      language,
      domain,
      cart,
      theme,
    }),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AsyncThunkAction<Returned, ThunkArg> = (
  arg: ThunkArg
) => Promise<any> & {
  unwrap: () => Promise<Returned>;
};
