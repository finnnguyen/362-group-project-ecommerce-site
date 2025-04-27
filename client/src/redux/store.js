import cartReducer from "./cartReducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const stripe = require('stripe')('sk_test_51RIaweERoDoP1omVGb6tuIBxZgcGs3hvjqSH3b4QyyR4hC1xYFx0u5qhxdUZSQbAvQTY3CzVicchM13Lh70n0Qn500Ll46msbOsk_test_2A9oLWQHs4BEyqVnZFkwstCd00e8Y5B0jV')
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};


const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);