import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vendors: [],
  currentVendor: null,
  isLoading: false,
  isError: false,
  message: '',
};

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
});

export const { reset } = vendorSlice.actions;
export default vendorSlice.reducer;