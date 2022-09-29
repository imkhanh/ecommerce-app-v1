import React from 'react';
import Siderbar from './Siderbar';

const Layout = ({ children }) => {
	return (
		<div className="flex items-start">
			<Siderbar />
			<div className="w-full h-full bg-gray-50 min-h-screen">{children}</div>
		</div>
	);
};

export default Layout;
