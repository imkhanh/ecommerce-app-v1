import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuth, isAdmin } from './Authenticated';

const RequireAuth = () => {
	const location = useLocation();

	if (!isAuth() && !isAdmin()) {
		return <Navigate to="/" state={{ from: location }} />;
	}
	return <Outlet />;
};

export default RequireAuth;
