import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import './index.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import ProtectedRoute from './components/ProtectedRoute';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import UserProfile from './pages/userProfile';
import Measurements from './pages/BodyMeasurement';
import DressTimeReward from './pages/DressTimeReward';
import { StoreProvider } from './Store';
import { store } from './States/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import customTheme from './theme';
import routesConfig from './components/Routers';
import LayoutAdmin from './pages/adminLayouts';
import Overview from './pages/Admin/Overview';
import Products from './pages/Admin/Products';
import ManageCategories from './pages/Admin/ManageCategories';
import AddProduct from './pages/Admin/Products/AddProduct';
import UpdateProduct from './pages/Admin/Products/UpdateProduct';
import { FlashAuto } from '@mui/icons-material';

const userDataString = localStorage.getItem('userInfo');

let userData: { isAdmin: boolean } | null = null;

if (userDataString !== null) {
  userData = JSON.parse(userDataString);
}

// const isAdmin: boolean = userData ? userData.isAdmin : false;

const isAdmin = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/measurements" element={<Measurements />} />
        <Route
          path="/dress-time-reward"
          element={
            <DressTimeReward
              timeSpent={5}
              totalEarnedPoints={20}
              claimedPoints={5}
            />
          }
        />
      </Route>

      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

const adminRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutAdmin />}>
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/updateProduct" element={<UpdateProduct />} />
      <Route path="/manageCategories" element={<ManageCategories />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/overview" element={<Overview />} />
      </Route>

      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <ToastContainer />
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <PayPalScriptProvider
            options={{ 'client-id': 'sb' }}
            deferLoading={true}
          >
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={!isAdmin ? router : adminRouter} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </HelmetProvider>
          </PayPalScriptProvider>
        </ThemeProvider>
      </Provider>
    </StoreProvider>
  </React.StrictMode>
);
