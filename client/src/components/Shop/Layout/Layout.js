import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<div>{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
