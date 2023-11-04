import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'

// Define your individual reducers and their respective state types
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  // Add other reducers here
})

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>

// Redux Persist configuration
const persistConfig = {
  key: 'cart', // The key for the persisted data in storage
  storage, // Storage engine (localStorage, AsyncStorage, etc.)
}

const persistedReducer = persistReducer<RootState, any>(
  persistConfig,
  rootReducer,
)

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
})

// Create a persistor object
const persistor = persistStore(store)

export { persistor, store }
