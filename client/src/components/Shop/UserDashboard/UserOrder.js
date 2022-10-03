import React from 'react';
import DashboardLayout from '.';

const UserOrderSection = () => {
	return <div>UserOrderSection</div>;
};

const UserOrder = () => {
	return <DashboardLayout children={<UserOrderSection />} />;
};

export default UserOrder;
