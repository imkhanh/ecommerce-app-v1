import React, { createContext } from 'react';
import Header from './Header';
import CartModal from '../CartModal/CartModal';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<LoginRegisterModal />
			{children}
		</>
	);
};

export default Layout;
