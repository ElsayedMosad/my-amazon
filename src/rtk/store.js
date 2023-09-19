import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productsSlice";
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
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const amazonPersistReducer = persistReducer(persistConfig, amazonReducer);
const amazonPersistReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    productReducer: productReducer,
    userReducer: amazonPersistReducer
  },
  // reducer: { amazon: amazonPersistReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
