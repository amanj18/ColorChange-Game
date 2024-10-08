import { combineReducers } from '@reduxjs/toolkit';
import { api, feeds } from '../api';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [feeds.reducerPath]: feeds.reducer
});
