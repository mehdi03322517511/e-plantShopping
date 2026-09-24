import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, id } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id: id || name, name, image, cost: Number(cost), price: Number(cost), quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = Math.max(0, quantity);
        if (itemToUpdate.quantity === 0) {
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
