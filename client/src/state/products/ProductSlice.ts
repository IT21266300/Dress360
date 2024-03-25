import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CounterState {
  totalStock: number;
  loading: boolean;
  productData: [];
  productCount: number;
}
const initialState: CounterState = {
  totalStock: 0,
  loading: false,
  productData: [],
  productCount: 0,
};

const counterSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<[]>) => {
        state.productData = action.payload;
        state.productCount = action.payload.length;
        state.loading = false;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/product/getProducts`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export default counterSlice.reducer;
