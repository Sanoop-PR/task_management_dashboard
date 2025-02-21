import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authSlice from "./slice/authSlice";
import tasksSlice from "./slice/tasksSlice";

// Define RootState Type
export type RootState = ReturnType<typeof rootReducer>;

// Persist Config with TypeScript
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "auth",
  ],
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        console.error("Encryption error", error);
      },
    }),
  ],
};

// Root reducer
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
        ignoredActions: ['persist/PERSIST'],  // Ignore serializable checks for persist actions
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
