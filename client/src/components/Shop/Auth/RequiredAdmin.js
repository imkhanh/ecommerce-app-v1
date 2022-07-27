import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { isAuth, isAdmin } from './Auth';

const RequiredAdmin = () => {
	const location = useLocation();

	if (isAuth() && !isAdmin()) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	return <Outlet />;
};

export default RequiredAdmin;
