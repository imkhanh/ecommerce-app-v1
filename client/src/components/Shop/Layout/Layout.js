import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartModal from './CartModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<main style={{ minHeight: 'calc(100vh - 146px)' }}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
