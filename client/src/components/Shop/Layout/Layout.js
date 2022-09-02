import React, { createContext } from 'react';
import Header from './Header';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<div className="pt-16 max-w-[1200px] mx-auto">{children}</div>
			<div>Footer</div>
		</>
	);
};

export default Layout;
