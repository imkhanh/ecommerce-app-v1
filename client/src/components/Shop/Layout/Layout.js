import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthModal from '../Auth/AuthModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
