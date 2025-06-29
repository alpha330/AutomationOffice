import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers"; 
import thunk from "redux-thunk";
import authReducer from '../store/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
