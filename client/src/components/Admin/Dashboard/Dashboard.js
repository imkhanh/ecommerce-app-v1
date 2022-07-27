import React from 'react';
import Layout from '../Layout/Layout';

const DashboardComponent = () => {
	return <div>DashboardComponent</div>;
};

const Dashboard = () => {
	return <Layout children={<DashboardComponent />} />;
};

export default Dashboard;
