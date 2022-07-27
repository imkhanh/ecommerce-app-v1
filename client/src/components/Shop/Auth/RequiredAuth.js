import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { isAdmin, isAuth } from './Auth';

const RequiredAuth = () => {
	const location = useLocation();

	if (!isAuth()) {
		return <Navigate to="/" state={{ from: location }} />;
	} else if (isAdmin()) {
		return <Navigate to="/admin/dashboard" state={{ from: location }} />;
	}

	return <Outlet />;
};

export default RequiredAuth;
