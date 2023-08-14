import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, totalAmount: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.total,
        0
      );
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === newItem.id
      );
      if (existingItemIndex > -1) {
        state.items[existingItemIndex] = newItem;
      } else {
        state.items.push(newItem);
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.total,
        0
      );
      state.changed = true;
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.total,
        0
      );
      state.changed = true;
    },
    onOrder(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
