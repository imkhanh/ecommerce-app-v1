import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsGear, BsGrid, BsHandbag, BsHeart, BsPerson, BsPersonCircle, BsTelephone, BsPower, BsSearch, BsGeoAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { isAuth, isAdmin, logout } from '../Auth/Auth';

const Header = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const menuRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const [sticky, setSticky] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};
		window.addEventListener('click', handleClick, true);
		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const stickyClass = scrollY >= 100 ? 'is-sticky' : '';
			setSticky(stickyClass);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const links = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	const classNav = `py-4 px-12 lg:px-8 md:px-4 border-y border-gray-200 flex items-center justify-between ${sticky}`;

	return (
		<header>
			<div className="h-8 pl-12 lg:pl-8 md:pl-4 flex items-center justify-between bg-black">
				<div className="flex items-center text-white space-x-2 transition-all">
					<BsTelephone className="text-sm" />
					<p className="text-[10px]">Call +84 79 424 0880</p>
				</div>
				<div className="px-4 h-full flex items-center space-x-2 bg-gray-200 text-black">
					<BsGeoAlt className="text-sm" />
					<span className="text-xs">Store Locator</span>
				</div>
			</div>
			<nav className={classNav}>
				<div className="hidden md:block md:w-1/3">
					<span onClick={() => dispatch({ type: 'toggleMenu', payload: !data.toggleMenu })} className="cursor-pointer select-none ">
						{data.toggleMenu ? <IoCloseOutline className="text-xl" /> : <IoMenuOutline className="text-xl" />}
					</span>
				</div>
				<div className="w-1/3 md:hidden">
					<ul className="flex space-x-6 lg:space-x-4">
						{links.map((link, index) => (
							<li key={index}>
								<Link to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs uppercase font-medium text-gray-800 hover:text-black nav-link">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-1/3 flex justify-center">
					<Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-black font-bold uppercase tracking-widest">
						Ambition
					</Link>
				</div>
				<div className="w-1/3 flex justify-end space-x-6 lg:space-x-4">
					<div className="md:hidden">
						<BsSearch className="text-base" />
					</div>
					<Link to="/user/wish-list" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
							<Link to="/login">
								<BsPerson className="text-base" />
							</Link>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag className="text-base" />
						<span className="absolute -top-3 -right-3 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white">0</span>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
