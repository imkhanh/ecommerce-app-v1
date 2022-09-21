import React, { createContext } from 'react';
import Header from './Header';
import AuthModal from '../Auth/AuthModal';
import CartModal from './CartModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			<CartModal />
			<div style={{ paddingTop: '56px', minHeight: 'calc(100vh)' }}>{children}</div>
		</>
	);
};

export default Layout;
