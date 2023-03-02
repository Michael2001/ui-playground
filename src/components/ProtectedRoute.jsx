import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';

const ProtectedRoute = () => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to='/login' />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
