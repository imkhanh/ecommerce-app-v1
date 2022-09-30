import React from 'react';
import {
	BsAppIndicator,
	BsCollection,
	BsGrid,
	BsPeople,
	BsReceipt,
	BsBack,
	BsPower,
	BsEmojiSmile,
} from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Siderbar = () => {
	const location = useLocation();

	const sideBarLinks = [
		{ label: 'Dashboard', icon: <BsAppIndicator />, to: '/admin/dashboard' },
		{ label: 'Products', icon: <BsGrid />, to: '/admin/products' },
		{ label: 'Categories', icon: <BsCollection />, to: '/admin/categories' },
		{ label: 'Users', icon: <BsPeople />, to: '/admin/users' },
		{ label: 'Orders', icon: <BsReceipt />, to: '/admin/orders' },
	];

	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	return (
		<div className="sticky top-0 left-0 max-w-[240px] w-full h-screen bg-white shadow-xl z-10">
			<div className="flex flex-col w-full h-full">
				<div className="h-16 flex items-center justify-center">
					<Link to="/admin/dashboard" className="flex items-center space-x-2">
						<BsEmojiSmile />
						<span className="uppercase text-lg font-bold tracking-widest">Admin</span>
					</Link>
				</div>

				<div className="flex-1 overflow-y-scroll">
					<div className="space-y-2">
						<span className="p-4 text-xs font-light uppercase text-black/50">Manager</span>
						<ul>
							{sideBarLinks.map((link, index) => {
								return (
									<li key={index}>
										<Link
											to={link.to}
											className={`${
												location.pathname === link.to
													? 'border-r-2 border-black text-black'
													: 'text-black/70 bg-white'
											} px-6 py-3 flex items-center hover:text-black duration-200 ease-in-out`}
										>
											<span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
												{link.icon}
											</span>
											<span className="ml-4 text-xs uppercase font-light">{link.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="space-y-2">
						<span className="p-4 text-xs font-light uppercase text-black/50">Shop</span>
						<ul>
							<li>
								<Link
									to="/"
									className="px-6 py-3 text-black/70 hover:text-black flex items-center duration-200 ease-in-out"
								>
									<span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
										<BsBack />
									</span>
									<span className="ml-4 text-xs uppercase font-light">SHop</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="relative h-14 px-4 flex items-center border-t">
					<div onClick={() => logout()} className="py-2 px-4 flex items-center cursor-pointer">
						<BsPower />
						<span className="ml-4 text-sm">Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Siderbar;
