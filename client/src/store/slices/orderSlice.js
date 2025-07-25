import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  cart: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { reset, addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;