import React, { createContext, useReducer } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import CartModal from '../CartModal';
import UserSidebar from './UserSidebar';
import { dashboardReducer, dashboardState } from './DashboardContext';

export const DashboardContext = createContext();

const DashboardLayout = ({ children }) => {
	const [state, dispatch] = useReducer(dashboardReducer, dashboardState);

	return (
		<DashboardContext.Provider value={{ state, dispatch }}>
			<Header />
			<CartModal />
			<main className="pt-14" style={{ minHeight: 'calc(100vh - 56px)' }}>
				<div className="px-8 lg:px-4 my-12 grid grid-cols-9 gap-8 lg:gap-2 md:gap-y-8">
					<UserSidebar />
					<div className="col-span-7 lg:col-span-6 md:col-span-9">{children}</div>
				</div>
			</main>
			<Footer />
		</DashboardContext.Provider>
	);
};

export default DashboardLayout;
