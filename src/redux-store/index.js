import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import cartSliceReducer from "./cart-slice";

const store = configureStore({
  reducer: { auth: authSliceReducer, cart: cartSliceReducer },
});

export default store;
