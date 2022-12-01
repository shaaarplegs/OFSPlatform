import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "../features/auth/authSlice";


const store = configureStore({
  reducer: { auth: AuthSlice },
});

export default store;
