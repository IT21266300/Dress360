import { Navigate } from 'react-router-dom';

// import views

import Products from '../pages/Admin/Products';
import Overview from '../pages/Admin/Overview';
import ManageCategories from '../pages/Admin/ManageCategories';
import LayoutAdmin from '../pages/adminLayouts';
import AddProduct from '../pages/Admin/Products/AddProduct';
import UpdateProduct from '../pages/Admin/Products/UpdateProduct';
// import AddProduct from '../pages/Admin/Products/AddProduct/addp';

const isAdmin: boolean = true;

const routesConfig = [
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        path: '/admin',
        element: <Navigate to="/overview" replace />,
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
      {
        path: '/addProduct',
        element: <AddProduct />,
      },
      {
        path: '/updateProduct',
        element: <UpdateProduct />,
      },
    ],
  },
];

export default routesConfig;
