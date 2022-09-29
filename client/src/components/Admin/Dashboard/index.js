import React, { createContext, useReducer } from 'react';
import { dashboardReducer, dashboardState } from './DashboardContext';
import Layout from '../Layout';

export const DashboardContext = createContext();

const DashboardComponent = () => {
	return (
		<section>
			<div></div>
			<div></div>
		</section>
	);
};

const Dashboard = () => {
	const [state, dispatch] = useReducer(dashboardReducer, dashboardState);

	return (
		<DashboardContext.Provider value={{ state, dispatch }}>
			<Layout children={<DashboardComponent />} />
		</DashboardContext.Provider>
	);
};

export default Dashboard;
