import React from 'react';
import { BsHeart, BsKey, BsPerson, BsReceipt } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const UserSidebar = () => {
	const location = useLocation();

	const siderBarLinks = [
		{ label: 'My Account', to: '/user/profile', icon: <BsPerson /> },
		{ label: 'My Wish List', to: '/user/wish-list', icon: <BsHeart /> },
		{ label: 'My Order', to: '/user/order-list', icon: <BsReceipt /> },
		{ label: 'Change Password', to: '/user/change-password', icon: <BsKey /> },
	];

	return (
		<div className="col-span-2 lg:col-span-3 md:col-span-9">
			<div className="h-20 pl-8 bg-gray-800 border-t-2 border-black flex items-center ">
				<span className="text-sm uppercase text-white font-medium">Manager Dashboard</span>
			</div>
			<ul>
				{siderBarLinks.map((link, index) => {
					return (
						<li key={index}>
							<Link
								to={link.to}
								className={`${
									location.pathname === link.to ? 'border-l-2 border-black bg-gray-50' : 'bg-white'
								} py-5 px-8 flex items-center hover:bg-gray-50`}
							>
								<span>{link.icon}</span>
								<span className="ml-4 text-sm">{link.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default UserSidebar;
