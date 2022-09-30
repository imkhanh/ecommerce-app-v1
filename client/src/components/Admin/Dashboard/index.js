import React, { createContext, useReducer } from 'react';
import { dashboardReducer, dashboardState } from './DashboardContext';
import Layout from '../Layout';
import CardItem from './CardItem';
import SlideUpload from './SlideUpload';

export const DashboardContext = createContext();

const DashboardComponent = () => {
	return (
		<section className="p-8 space-y-8">
			<CardItem />
			<SlideUpload />
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
