import React, { createContext } from 'react';
import Header from './Header';
import CartModal from './CartModal';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<LoginRegisterModal />
			<div className="pt-14 bg-white">{children}</div>
		</>
	);
};

export default Layout;
