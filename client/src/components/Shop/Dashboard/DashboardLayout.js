import React, { createContext, useReducer } from 'react';
import Header from '../Layout/Header';
import CartModal from '../Layout/CartModal';
import Footer from '../Layout/Footer';
import { dashboardState, dashboardReducer } from './DashboardContext';

export const DashboardContext = createContext();

export const DashboardLayout = ({ children }) => {
	const [state, dispatch] = useReducer(dashboardReducer, dashboardState);

	return (
		<DashboardContext.Provider value={{ state, dispatch }}>
			<>
				<Header />
				<CartModal />
				<div className="p-12 lg:p-8 md:p-4 transition-all" style={{ minHeight: 'calc(100vh - 112px)' }}>
					<div className="max-w-[89rem] mx-auto h-full grid grid-cols-5 gap-4">
						<div className="col-span-1 bg-slate-300">Side bar</div>
						<div className="col-span-4 bg-black/20">{children}</div>
					</div>
				</div>
				<Footer />
			</>
		</DashboardContext.Provider>
	);
};
