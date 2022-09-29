import React from 'react';
import Layout from '../Layout';

const DashboardComponent = () => {
	return (
		<div className="h-[2000px]">
			<div className="text-sm">Product card</div>
			<div></div>
		</div>
	);
};

const Dashboard = () => {
	return <Layout children={<DashboardComponent />} />;
};

export default Dashboard;
