import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import themeReducer, { resetColorScheme } from "../reducers/themeReducer";
import authReducer from "../reducers/authReducer";
import { tmdbApi } from "../services/tmddbApi";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"],
};

const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      tmdbApi.middleware
    ), // ← BUNU EKLE (hata bunu istiyor)
  //.concat(rtkQueryErrorLogger),
});

store.dispatch(resetColorScheme());

export const persistor = persistStore(store);

// Tipler
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
