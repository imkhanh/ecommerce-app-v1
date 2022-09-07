import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<main className="pt-14 container" style={{ minHeight: 'calc(100vh - 56px)' }}>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
