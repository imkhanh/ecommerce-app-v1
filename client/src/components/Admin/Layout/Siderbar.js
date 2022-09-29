import React, { useState } from 'react';
import {
	BsAppIndicator,
	BsCollection,
	BsGrid,
	BsPeople,
	BsReceipt,
	BsBack,
	BsPower,
	BsEmojiSmile,
	BsChevronRight,
	BsChevronLeft,
} from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Siderbar = () => {
	const location = useLocation();
	const [show, setShow] = useState(false);

	const sideBarLinks = [
		{ label: 'Dashboard', icon: <BsAppIndicator />, to: '/admin/dashboard' },
		{ label: 'Products', icon: <BsGrid />, to: '/admin/products' },
		{ label: 'Categories', icon: <BsCollection />, to: '/admin/categories' },
		{ label: 'Users', icon: <BsPeople />, to: '/admin/users' },
		{ label: 'Orders', icon: <BsReceipt />, to: '/admin/orders' },
	];

	return (
		<div className="fixed top-0 left-0 max-w-[240px] w-full h-screen bg-white border-r border-black/10 z-10">
			<div className="flex flex-col w-full h-full">
				<div className="h-14 flex items-center justify-center">
					<Link to="/admin/dashboard" className="flex items-center space-x-2">
						<BsEmojiSmile />
						<span className="uppercase text-lg font-bold tracking-widest">Admin</span>
					</Link>
				</div>

				<div className="flex-1 overflow-y-scroll">
					<div className="space-y-2">
						<span className="p-4 text-xs font-medium uppercase text-black/50">Shop</span>
						<ul>
							<li>
								<Link to="/" className="px-6 py-3 flex items-center duration-200 ease-in-out">
									<span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
										<BsBack />
									</span>
									<span className="ml-4 text-sm uppercase">SHop</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-2">
						<span className="p-4 text-xs font-medium uppercase text-black/50">Manager</span>
						<ul>
							{sideBarLinks.map((link, index) => {
								return (
									<li key={index}>
										<Link
											to={link.to}
											className={`${
												location.pathname === link.to
													? 'border-r-2 border-sky-800 text-black'
													: 'text-black bg-white'
											} px-6 py-3 flex items-center duration-200 ease-in-out`}
										>
											<span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
												{link.icon}
											</span>
											<span className="ml-4 text-sm uppercase ">{link.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="relative h-14 px-4 flex items-center border-t">
					<div onClick={() => setShow(!show)} className="flex items-center space-x-2 cursor-pointer select-none">
						<span className="text-sm font-medium">Wellcome: Admin </span>
						<span> {show ? <BsChevronLeft /> : <BsChevronRight />}</span>
					</div>
					{show && (
						<ul className="absolute bottom-full right-0 origin-top-right bg-white w-48 h-auto shadow-lg rounded border border-gray-200 z-20">
							<li>
								<Link
									to="/"
									className="m-2 py-2 px-4 flex items-center hover:text-black hover:bg-gray-100 rounded-sm"
								>
									<BsPower />
									<span className="ml-4 text-sm">Logout</span>
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Siderbar;
