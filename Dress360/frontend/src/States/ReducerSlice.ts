import { Cart } from '../types/Cart';
import { UserInfo } from '../types/UserInfo';

type AppState = {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo;
};


const initialState: AppState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')!)
      : null,
  
    mode: localStorage.getItem('mode')
      ? localStorage.getItem('mode')!
      : window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')!)
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress')!)
        : {},
      paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')!
        : 'PayPal',
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      dressTimeReward: 0,
      totalPrice: 0,
    },
  }