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
			<div className="px-8 md:px-4 max-w-[1280px] mx-auto w-full h-full transition-all" style={{ minHeight: 'calc(100vh - 112px)' }}>
				{children}
			</div>
			<div className="h-14 bg-black text-white text-sm flex items-center justify-center">Footer</div>
		</>
	);
};

export default Layout;
