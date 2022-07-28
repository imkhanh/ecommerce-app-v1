import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsHandbag, BsHeart, BsSearch, BsPersonCircle, BsSpeedometer, BsPower, BsGear, BsReceipt } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline, IoPersonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { isAdmin, isAuth, logout } from '../Auth/Auth';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const menuRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

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
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	const dropDownMenuComponent = () => {
		return (
			<ul className="dropdown-menu">
				{isAdmin() ? (
					<li>
						<Link to="/admin/dashboard" className="dropdown-menu-link">
							<BsSpeedometer />
							<span className="ml-4 text-sm">Admin</span>
						</Link>
					</li>
				) : (
					<>
						<li>
							<Link to="/user/profile" className="dropdown-menu-link">
								<IoPersonOutline />
								<span className="ml-4 text-sm">Profile</span>
							</Link>
						</li>
						<li>
							<Link to="/user/profile" className="dropdown-menu-link">
								<BsHeart />
								<span className="ml-4 text-sm">Wish List</span>
							</Link>
						</li>
						<li>
							<Link to="/user/profile" className="dropdown-menu-link">
								<BsGear />
								<span className="ml-4 text-sm">Change Password</span>
							</Link>
						</li>
						<li>
							<Link to="/user/profile" className="dropdown-menu-link">
								<BsReceipt />
								<span className="ml-4 text-sm">Orders</span>
							</Link>
						</li>
					</>
				)}
				<li>
					<div onClick={logout} className="dropdown-menu-link cursor-pointer">
						<BsPower />
						<span className="ml-4 text-sm">Logout</span>
					</div>
				</li>
			</ul>
		);
	};

	return (
		<header>
			<nav className="h-14 px-12 lg:px-8 md:px-4 border-y border-gray-200 flex items-center justify-between">
				<div className="hidden md:block md:w-1/3">
					<span onClick={() => dispatch({ type: 'toggleMenu', payload: !state.toggleMenu })} className="cursor-pointer select-none ">
						{state.toggleMenu ? <IoCloseOutline className="text-xl" /> : <IoMenuOutline className="text-xl" />}
					</span>
				</div>
				<div className="w-1/3 md:flex md:justify-center">
					<Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-black text-2xl font-black uppercase italic" style={{ fontFamily: 'Bigilla' }}>
						Ambition
					</Link>
				</div>

				<div className="w-1/3 md:hidden flex justify-center">
					<ul className="flex space-x-12 xl:space-x-8 lg:space-x-4 transition-all">
						{links.map((link, index) => (
							<li key={index}>
								<Link to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-black font-medium">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="w-1/3 flex justify-end space-x-6 lg:space-x-4 transition-all">
					<div>
						<BsSearch />
					</div>
					<Link to="/user/wish-list" className="md:hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
						<BsHeart />
					</Link>
					<div ref={menuRef} className="relative">
						{!isAuth() ? (
							<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
								<IoPersonOutline />
							</span>
						) : (
							<>
								<span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer select-none">
									<BsPersonCircle />
								</span>
								{isVisible && dropDownMenuComponent()}
							</>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag />
						<span className="absolute -top-3 -right-3 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white">0</span>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
