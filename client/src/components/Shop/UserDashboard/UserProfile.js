import React from 'react';
import DashboardLayout from '.';

const UserProfileSection = () => {
	return (
		<div className="">
			<div>UserProfile</div>
		</div>
	);
};

const UserProfile = () => {
	return <DashboardLayout children={<UserProfileSection />} />;
};

export default UserProfile;
