import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartModal from './CartModal';
import LoginRegisterModal from '../Auth/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<LoginRegisterModal />
			<main style={{ minHeight: 'calc(100vh - 112px)' }}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
