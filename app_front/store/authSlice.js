import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false, 
  logged: false,
  token: null,
  user_id: null,
  email: null,
  type: null,
  error: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStarted(state) {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.logged = true;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.type = action.payload.type;
      state.error = false;
    },
        
    loginFailed(state, action) {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload?.message; 
    },
    
    logoutSuccess(state) {
      return {
        ...initialState,
        loading: false,
        logged: false,
      };
    },
  },
});


export const { loginStarted, loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;