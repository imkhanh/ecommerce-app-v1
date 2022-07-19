import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { BsGear, BsGrid, BsHandbag, BsHeart, BsPerson, BsPersonCircle, BsPower, BsSearch } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { isAuth, isAdmin, logout } from '../Auth/Authentication';

const Header = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const menuRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick, true);

		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	const links = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/qanda' },
	];

	return (
		<header className="h-14 fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-20">
			<div className="h-full px-12 lg:px-8 md:px-4 grid grid-cols-3  items-center transition-all duration-300 ease-in-out">
				{/* LEFT */}
				<div className="hidden md:block">
					<span onClick={() => dispatch({ type: 'toggleMenu', payload: !data.toggleMenu })} className="cursor-pointer select-none ">
						{data.toggleMenu ? <IoCloseOutline className="text-xl" /> : <IoMenuOutline className="text-xl" />}
					</span>
					<div className={`absolute top-14 left-0 w-full h-screen ${data.toggleMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transform transition-all duration-300 ease-in-out  bg-gray-100 z-20`}>
						<ul className="h-full flex flex-col items-center justify-center space-y-10">
							{links.map((link, index) => {
								return (
									<li key={index}>
										<Link to={link.to} onClick={() => dispatch({ type: 'toggleMenu', payload: false })} className="text-lg text-black hover:underline hover:underline-offset-2 hover:italic">
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="md:flex md:justify-center">
					<Link to="/">ONE+</Link>
				</div>

				{/* CENTER */}
				<div className="md:hidden flex justify-center">
					<ul className="flex space-x-10 lg:space-x-8">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="text-xs uppercase text-black">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				{/* RIGHT */}
				<div className="flex justify-end space-x-6 lg:space-x-4">
					<div className="md:hidden">
						<BsSearch className="text-base" />
					</div>
					<Link to="/user/wish-list">
						<BsHeart className="text-base" />
					</Link>
					<div ref={menuRef} className="relative">
						{isAuth() ? (
							<>
								<span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer select-none">
									<BsPersonCircle className="text-base" />
								</span>
								{isVisible && (
									<div className="absolute top-12 left-[340%] w-48 h-auto transform  -translate-x-full bg-white border border-black/10 rounded-[3px] shadow-md z-30">
										{isAdmin() ? (
											<Link to="/admin/dashboard" className="py-[10px] px-4 flex items-center text-gray-700 hover:text-black hover:bg-gray-50">
												<BsGrid />
												<span className="ml-4 text-sm">Admin</span>
											</Link>
										) : (
											<>
												<Link to="/user/profile" className="py-[10px] px-4 flex items-center text-gray-700 hover:text-black hover:bg-gray-50">
													<BsPersonCircle />
													<span className="ml-4 text-sm">Profile</span>
												</Link>
												<Link to="/user/wish-list" className="py-[10px] px-4 flex items-center text-gray-700 hover:text-black hover:bg-gray-50">
													<BsHeart />
													<span className="ml-4 text-sm">Wish List</span>
												</Link>
												<Link to="/user/change-password" className="py-[10px] px-4 flex items-center text-gray-700 hover:text-black hover:bg-gray-50">
													<BsGear />
													<span className="ml-4 text-sm">Change Password</span>
												</Link>
											</>
										)}
										<div onClick={logout} className="py-[10px] px-4 flex items-center text-gray-700 hover:text-black hover:bg-gray-50 border-t border-gray-200 cursor-pointer">
											<BsPower />
											<span className="ml-4 text-sm">Logout</span>
										</div>
									</div>
								)}
							</>
						) : (
							<span onClick={() => dispatch({ type: 'authModal', payload: true })} className="cursor-pointer select-none">
								<BsPerson className="text-base" />
							</span>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="cursor-pointer select-none">
						<BsHandbag className="text-base" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
