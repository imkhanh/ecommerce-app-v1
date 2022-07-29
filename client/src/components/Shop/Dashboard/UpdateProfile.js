import React from 'react';
import { DashboardLayout } from './DashboardLayout';

const UpdateProfileComponent = () => {
	return <div className="p-8">UpdateProfile</div>;
};

const UpdateProfile = () => {
	return <DashboardLayout children={<UpdateProfileComponent />} />;
};

export default UpdateProfile;
