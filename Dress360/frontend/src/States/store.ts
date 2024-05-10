import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './ProductSlice';

export const store = configureStore({
  reducer: {
    products: ProductReducer
  },
});

// export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
