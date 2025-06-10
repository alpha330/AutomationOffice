import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user_id: null,
  email:null,
  type:null,
  logged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.token;
      state.user_id = action.user_id;
      state.email = action.email;
      state.type = action.type;
      state.logged = true;
    },
    logout(state) {
      state.token = null;
      state.user_id = null;
      state.email = null;
      state.type = null;
      state.logged = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
