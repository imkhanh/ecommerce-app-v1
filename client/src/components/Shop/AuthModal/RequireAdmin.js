import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuth, isAdmin } from './Authenticated';

const RequireAdmin = () => {
	const location = useLocation();

	if (isAuth() && isAdmin()) {
		return <Outlet />;
	}
	return <Navigate to="/" state={{ from: location }} />;
};

export default RequireAdmin;
