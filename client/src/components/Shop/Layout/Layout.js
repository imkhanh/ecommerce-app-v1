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
			<div className="pt-14" style={{ minHeight: 'calc(100vh - 64px)' }}>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default Layout;
