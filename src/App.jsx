import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Front from './pages/Front';
import Back from './pages/Back';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './assets/index.css';
// import { app } from './firebase-config';
// import { writeBatch, doc } from 'firebase/firestore';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ProtectedLayout } from './features/authentication/components/ProtectedLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: 'dashboard',
    element: <ProtectedLayout />,
    private: true,
    children: [
      {
        path: 'backend',
        element: <Back />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
