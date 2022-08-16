import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsSearch, BsPerson, BsPersonCircle, BsApp, BsGear, BsReceipt } from 'react-icons/bs';
import { LayoutContext } from './Layout';
import { isAuth, isAdmin, logout } from '../Auth/Authentication';

const Header = () => {
	const { dispatch } = useContext(LayoutContext);
	const [isVisible, setIsVisible] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	const links = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/' },
		{ label: 'Notice', to: '/' },
		{ label: 'Q&A', to: '/' },
		{ label: 'News', to: '/' },
	];

	const dropDownMenu = () => {
		return (
			<div className="absolute top-14 left-16 transform -translate-x-full w-52 h-auto bg-white border border-gray-200 rounded-sm shadow-md">
				{isAdmin() ? (
					<Link to="/admin/dashboard">
						<BsApp />
						<span>Dashboard</span>
					</Link>
				) : (
					<>
						<Link to="/user/profile" className="py-3 px-6 flex items-center text-black/70 hover:text-black hover:bg-gray-50 transition-colors">
							<BsPerson className="text-lg" />
							<span className="ml-4 text-sm">Profile</span>
						</Link>
						<Link to="/user/wish-list" className="py-3 px-6 flex items-center text-black/70 hover:text-black hover:bg-gray-50 transition-colors">
							<BsHeart />
							<span className="ml-4 text-sm">My Wish List</span>
						</Link>
						<Link to="/user/order" className="py-3 px-6 flex items-center text-black/70 hover:text-black hover:bg-gray-50 transition-colors">
							<BsReceipt />
							<span className="ml-4 text-sm">My Order</span>
						</Link>
						<Link to="/user/change-password" className="py-3 px-6 flex items-center text-black/70 hover:text-black hover:bg-gray-50 transition-colors">
							<BsGear />
							<span className="ml-4 text-sm">Change Password</span>
						</Link>
					</>
				)}
				<div onClick={logout} className="py-3 px-6 flex items-center border-t border-gray-200 text-black/70 hover:text-black hover:bg-gray-50 transition-colors">
					<span className="text-sm">Logout</span>
				</div>
			</div>
		);
	};

	return (
		<header className="h-16 px-8 md:px-4 bg-white flex items-center justify-between">
			<div className="flex items-center">
				<div>
					<Link to="/" className="text-3xl uppercase font-bold" style={{ fontFamily: 'Bigilla' }}>
						Ambition
					</Link>
				</div>
				<nav className="ml-14">
					<ul className="flex space-x-8 lg:space-x-6 sm:hidden">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link to={`${link.to}`} className="text-xs font-semibold uppercase tracking-wider text-black">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
			<div className="flex space-x-6">
				<div className="md:hidden">
					<BsSearch />
				</div>
				<Link to="/user/wish-list">
					<BsHeart />
				</Link>
				<div ref={menuRef} className="relative cursor-pointer select-none">
					{isAuth() ? (
						<>
							<span onClick={() => setIsVisible(!isVisible)}>
								<BsPersonCircle />
							</span>
							{isVisible && dropDownMenu()}
						</>
					) : (
						<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
							<BsPerson className="text-lg" />
						</span>
					)}
				</div>
				<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="cursor-pointer relative">
					<BsHandbag />
					<span className="absolute -top-3 -right-3 w-6 h-6 bg-black text-white rounded-full border-2 border-white flex justify-center items-center text-sm">0</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
