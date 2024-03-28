import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counter/counterSlice"
import ProductReducer from './products/ProductSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: ProductReducer
  },
});

// export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
