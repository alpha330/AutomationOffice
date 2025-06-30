import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/authSlice';
import profileReducer from "../store/profileSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
