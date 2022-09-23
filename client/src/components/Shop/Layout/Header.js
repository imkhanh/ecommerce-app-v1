import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsBagCheck, BsHandbag, BsHeart, BsKey, BsPerson, BsPersonCircle, BsPower } from 'react-icons/bs';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { isAdmin, isAuth, logout } from '../Auth/Authenticated';
import { Link } from 'react-router-dom';
import { LayoutContext } from './Layout';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const divRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (divRef.current && !divRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick, true);
		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/shop' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/qa' },
	];

	return (
		<header className="h-14 fixed top-0 inset-x-0 w-full bg-white border-b border-black/10 z-20">
			<div className="h-full px-8 md:px-4 flex items-center justify-between">
				<div className="hidden md:block md:w-1/4">
					<span
						className="text-xl text-black cursor-pointer select-none transition-colors"
						onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })}
					>
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-1/4 md:w-2/4 md:flex md:justify-center">
					<Link to="/" className="text-2xl font-black text-black">
						.K
					</Link>
				</div>
				<ul
					className={`w-2/4 flex justify-center md:fixed md:top-14 md:w-full md:h-screen md:bg-gray-50 md:flex-col md:items-center ${
						state.mobileToggle ? 'md:left-0 md:opacity-100' : 'md:-left-full md:opacity-0'
					} duration-300 ease-in-out`}
				>
					{navLinks.map((link, index) => {
						return (
							<li key={index}>
								<Link
									to={link.to}
									onClick={() => dispatch({ type: 'mobileToggle', payload: false })}
									className="inline-block mx-6 lg:mx-4 md:my-4 text-sm md:text-lg md:font-bold text-black hover:text-black/60 md:hover:text-black/60 tracking-widest transition-colors"
								>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>
				<div className="w-1/4 flex justify-end space-x-6 md:space-x-4">
					<div>
						<Link to="/user/wish-list">
							<BsHeart />
						</Link>
					</div>
					<div ref={divRef} className="relative cursor-pointer select-none">
						{isAuth() ? (
							<>
								<span onClick={() => setIsVisible(!isVisible)} className="text-base cursor-pointer">
									<BsPersonCircle />
								</span>
								{isVisible && (
									<ul className="absolute top-8 -right-10 origin-top-right bg-white border border-gray-200 shadow-md w-48 h-auto rounded-sm z-20">
										{isAdmin() ? (
											<li>
												<Link
													to="/admin/dashboard"
													className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
												>
													<BsPerson />
													<span className="ml-4 text-sm">Admin</span>
												</Link>
											</li>
										) : (
											<>
												<li>
													<Link
														to="/user/profile"
														className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsPerson />
														<span className="ml-4 text-sm">Profile</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/order"
														className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsBagCheck />
														<span className="ml-4 text-sm">Orders</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/wish-list"
														className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsHeart />
														<span className="ml-4 text-sm">My Wish List</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/change-password"
														className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsKey />
														<span className="ml-4 text-sm">Change Password</span>
													</Link>
												</li>
											</>
										)}
										<li>
											<div
												onClick={() => logout()}
												className="py-2 px-4 flex items-center bg-white text-black/70 hover:text-black hover:bg-gray-50 duration-200 ease-in-out border-t border-gray-200"
											>
												<BsPower />
												<span className="ml-4 text-sm">Logout</span>
											</div>
										</li>
									</ul>
								)}
							</>
						) : (
							<span className="text-base" onClick={() => dispatch({ type: 'authModal', payload: true })}>
								<BsPerson />
							</span>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag />
						{state.cartProduct && (
							<span className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center border-2 border-white">
								{state.cartProduct?.length}
							</span>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
