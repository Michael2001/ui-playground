import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import Front from './pages/Front';
import Back from './pages/Back';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Root from './pages/Root';
import Missing from './pages/Missing';
import './assets/index.css';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/UserAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route index element={<Front />} />
			<Route path='/login' element={<Login />} />
			<Route path='signup' element={<Signup />} />
			<Route path='dashboard' element={<ProtectedRoute />}>
				<Route path='/dashboard' element={<Back />} />
			</Route>

			{/* Catch All */}
			<Route path='*' element={<Missing />} />
		</Route>
	)
);

root.render(
	<AuthContextProvider>
		<RouterProvider router={router} />
	</AuthContextProvider>
);
