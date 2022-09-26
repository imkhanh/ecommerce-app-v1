import React, { createContext } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import AuthModal from '../AuthModal';
import CartModal from '../CartModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			<CartModal />
			<div className="pt-14" style={{ minHeight: 'calc(100vh - 56px)' }}>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default Layout;
