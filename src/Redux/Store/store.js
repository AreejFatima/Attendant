/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "../Slices/userSlice";
import adminReducer from "../Slices/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    middleware: [thunk, logger],
  },
});

export default store;
