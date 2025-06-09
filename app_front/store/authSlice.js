import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  logged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.token;
      state.user = action.user;
      state.logged = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.logged = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
