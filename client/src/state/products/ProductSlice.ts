import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CounterState {
  totalStock: number;
  loading: boolean;
  productData: [];
  singleProduct:[],
  productCount: number;
  imageID : string;
  uploadState: boolean;
}
const initialState: CounterState = {
  totalStock: 0,
  loading: false,
  productData: [],
  singleProduct: [],
  productCount: 0,
  imageID: '',
  uploadState: false,
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
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<[]>) => {
        state.singleProduct = action.payload;
        state.loading = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.uploadState = false;
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.imageID = action.payload;
        state.uploadState = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
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

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/getProduct/${productId}`
      );
      return response.data.product;
    } catch (error) {
      return error;
    }
  }
);

export const uploadImage = createAsyncThunk(
  'product/uploadImage',
  async (base64EncodedImage) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/product/uploadImage`,
        {
          data: base64EncodedImage,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      return response.data.public_id
    } catch (error) {
      console.error(error);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId: string) => {
    await axios.delete(`http://localhost:4000/api/product/deleteProduct/${productId}`);
  }
);


// export const fetchItemData = createAsyncThunk() 

// async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:4000/api/product/getProduct/${mongoID}`
//     );
//     setItemData(response.data)
//   } catch (error) {
//     console.log(error);
//   }
// };


export default counterSlice.reducer;
