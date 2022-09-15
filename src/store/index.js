import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import { persistStore, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH } from 'redux-persist';
import { rootReducer } from './reducers';
import { initSagas } from './saga/initSagas';

const sagaMidleware = createSagaMiddleWare();

const midlewares = [sagaMidleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH],
      },
    }).concat(midlewares),
});

initSagas(sagaMidleware);

export const persistore = persistStore(store);
