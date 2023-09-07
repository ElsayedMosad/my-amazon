import { configureStore } from "@reduxjs/toolkit";
import amazonReducer from "./slices/amazonSlice";
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
    amazon: amazonReducer,
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
