import React, { createContext } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import CartModal from '../CartModal';

export const DashboardContext = createContext();

const DashboardLayout = ({ children }) => {
	return (
		<>
			<Header />
			<CartModal />
			<main className="pt-14" style={{ minHeight: 'calc(100vh - 56px)' }}>
				<div className="px-8 lg:px-4 my-12 grid grid-cols-9 gap-8 lg:gap-2 md:gap-y-4">
					<div className="bg-gray-50 border border-gray-200 col-span-2 lg:col-span-3 md:col-span-9">
						<div className="h-20 bg-gray-800">User Profile</div>
						<ul>
							<li>
								<span>UserProfile</span>
							</li>
						</ul>
					</div>
					<div className="bg-blue-50 col-span-7 lg:col-span-6 md:col-span-9">{children}</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default DashboardLayout;
