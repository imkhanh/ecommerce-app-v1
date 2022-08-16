import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartModal from '../CartModal/CartModal';
import LoginRegisterModal from '../Auth/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<CartModal />
			<div>{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
