import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/authSlice";

//persistence
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist'
import {combineReducers} from "@reduxjs/toolkit"  

const rootReducer = combineReducers({
  auth: AuthSlice
});

const persistConfig = {
  key:"root",
  version:1,
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})