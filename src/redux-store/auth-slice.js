import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
    expirationTime: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.expirationTime = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
