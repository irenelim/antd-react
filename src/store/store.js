import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import placeReducer from './Slices/placeSlice'
import userReducer from './Slices/userSlice'

const userPersistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(userPersistConfig, userReducer)

const rootReducer = combineReducers({
  user: persistedReducer,
  place: placeReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userMiddleware)
})

export const persistor = persistStore(store);