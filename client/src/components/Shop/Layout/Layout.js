import React, { createContext } from 'react';
import Header from './Header';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';
import CartModal from '../Cart/CartModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<LoginRegisterModal />
			<main className="pt-12 px-8 lg:px-4 duration-200 ease-in-out">{children}</main>
		</>
	);
};

export default Layout;
