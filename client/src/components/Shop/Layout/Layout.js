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
			{children}
		</>
	);
};

export default Layout;
