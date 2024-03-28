import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  loading: boolean;
  data: [];
}
const initialState: CounterState = {
  value: 0,
  loading: false,
  data: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        console.log('pending');
        state.loading = true;
      })
      // .addCase(
      //   incrementAsync.fulfilled,
      //   (state, action: PayloadAction<number>) => {
      //     state.value += action.payload;
      //     state.loading = false;
      //   }
      // );
      .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<[]>) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

// export const incrementAsync = createAsyncThunk(
//   'counter/incrementAsync',
//   async (amount: number) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return amount;
//   }
// );

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
