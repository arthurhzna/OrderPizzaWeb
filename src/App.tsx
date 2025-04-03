import { useState } from 'react'
import {AppLayout} from "./ui/AppLayout";
import {Error} from "./ui/Error";
import {Home} from "./ui/Home";
import {Cart} from "./features/cart/Cart";
import { Menu, loader as menuLoader } from './features/menu/Menu';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      // {
      //   path: '/order/new',
      //   element: <CreateOrder />,
      //   action: createOrderAction,
      // },
      // {
      //   path: '/order/:orderId',
      //   element: <Order />,
      //   loader: orderLoader,
      //   errorElement: <Error />,
      //   action: updateOrderAction,
      // },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
}


export default App
