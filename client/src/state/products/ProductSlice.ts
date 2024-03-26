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
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/getProducts`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const uploadImage = createAsyncThunk(
  'product/fetchProducts',
  async (base64EncodedImage) => {
    try {
      await axios.post(
        'http://localhost:4000/api/product/uploadImage',
        {
          data: base64EncodedImage,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export default counterSlice.reducer;
