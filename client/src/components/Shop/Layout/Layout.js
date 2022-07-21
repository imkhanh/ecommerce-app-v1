import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from '../Cart/Cart';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Cart />
			<main style={{ minHeight: 'calc(100vh - 146px)' }}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
