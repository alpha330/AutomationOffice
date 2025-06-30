import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,                 // اضافه شد برای پایداری state
  errorMessage: null,           // اضافه شد برای پایداری state
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
      state.last_name = action.payload.last_name; // <<< اینجا اصلاح شد
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
    // یک ردیوسر برای ریست کردن state (مثلاً هنگام خروج کاربر) هم مفید است
    resetProfile(state) {
        return initialState;
    }
  },
});

export const { profileStarted, profileSuccess, profileFailed, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;