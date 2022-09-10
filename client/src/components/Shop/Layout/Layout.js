import React, { createContext } from 'react';
import Header from './Header';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="pt-12">{children}</div>
		</>
	);
};

export default Layout;
