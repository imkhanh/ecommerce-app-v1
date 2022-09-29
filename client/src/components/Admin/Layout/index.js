import React from 'react';
import Siderbar from './Siderbar';

const Layout = ({ children }) => {
	return (
		<>
			<Siderbar />
			<div className="ml-[240px] w-full h-full bg-gray-50 min-h-screen">{children}</div>
		</>
	);
};

export default Layout;
