/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import adminReducer from "../Slices/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
export default store;
