import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
  first_name: null, 
  last_name: null,
  phone_number: null,
  image: null,
  signitures: null,
  date_of_birth: null,
  created_date: null,
  updated_date: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileStarted(state) {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
    },
    profileSuccess(state, action) {
      state.loading = false;
      state.error = false;
      state.first_name = action.payload.first_name; 
      state.last_name = action.payload.first_name;
      state.phone_number = action.payload.phone_number;
      state.image = action.payload.image;
      state.signitures = action.payload.signitures;
      state.date_of_birth = action.payload.date_of_birth;
      state.created_date = action.payload.created_date;
      state.updated_date = action.payload.updated_date;
    },
    profileFailed(state, action) {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload?.message; 
    },
  },
});


export const { profileStarted,profileSuccess,profileFailed } = profileSlice.actions;

export default profileSlice.reducer;