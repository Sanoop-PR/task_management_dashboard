import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authSlice from "./slice/authSlice";
import tasksSlice from "./slice/tasksSlice";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "auth","tasks"
  ],
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_STORE_ENCRYPT_KEY,
      onError: function (error) {
        console.error("Encryption error", error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  tasks: tasksSlice,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);