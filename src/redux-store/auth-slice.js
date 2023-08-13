import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    expirationTime: 0,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
    },
    logout(state, action) {
      state.token = null;
      state.expirationTime = 0;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
