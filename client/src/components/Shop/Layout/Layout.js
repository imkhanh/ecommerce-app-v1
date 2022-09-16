import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthModal from '../Auth/AuthModal';
import CartModal from '../Cart/CartModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			<CartModal />
			<div className="pt-14">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
