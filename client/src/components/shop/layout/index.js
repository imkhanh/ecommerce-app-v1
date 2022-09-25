import React, { createContext } from 'react';
import Header from './Header';
import AuthModal from '../auth/AuthModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			<div className="pt-16" style={{ minHeight: 'calc(100vh - 56px)' }}>
				{children}
			</div>
		</>
	);
};

export default Layout;
