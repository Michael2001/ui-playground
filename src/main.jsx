import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Front from './front';
import Back from './back';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
  },
  {
    path: '/backend',
    element: <Back />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
