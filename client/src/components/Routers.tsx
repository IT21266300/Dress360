import { Navigate } from 'react-router-dom';

// import views
import Signin from '../auth/signin/index';
import Signup from '../auth/signup/index';

import Home from '../pages/Custom/Home';
import Products from '../pages/Admin/Products';
import Overview from '../pages/Admin/Overview';
import ManageCategories from '../pages/Admin/ManageCategories';
import LayoutAdmin from '../pages/adminLayouts';
import LayoutCustomer from '../pages/customerLayouts';
import Categories from '../pages/Custom/Categories';
import Item from '../pages/Custom/Item';
import Showroom from '../pages/Custom/showroom';
//import UserProfile from './Drawer';

const isAdmin: boolean = false;

const routesConfig = isAdmin ? [
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      {
        path: '/',
        element: <Navigate to="/overview" replace />
      },
      {
        path: '/overview',
        element: <Overview />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/manageCategories',
        element: <ManageCategories />,
      },
    ],
  },
] : [
  {
    path: '/',
    element: <LayoutCustomer />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />
      },
      {
        path: '/home',
        element: <Home />,
      },
      // {
      //   path: '/userProfile',
      //   element: <UserProfile />,
      // },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/item',
        element: <Item />,
      },
      {
        path: '/showroom',
        element: <Showroom />,
      },
    ],
  },{
    path: '/signin',
    element: <Signin />,
  },{
    path: '/signup',
    element: <Signup />,
  }
];

export default routesConfig;
