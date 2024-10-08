import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { api, feeds } from "../api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, feeds.middleware),
  devTools: process.env.NODE_ENV === "development",
});
