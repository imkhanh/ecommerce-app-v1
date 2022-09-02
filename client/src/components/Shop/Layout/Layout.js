import React, { createContext } from 'react';
import Header from './Header';
import CartModal from '../Cart/CartModal';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<CartModal />
			<div className="pt-8 max-w-[1280px] w-full mx-auto" style={{ minHeight: 'calc(100vh - 112px)' }}>
				{children}
			</div>
			<div className="h-14">Footer</div>
		</>
	);
};

export default Layout;
