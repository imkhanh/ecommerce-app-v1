import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCreditCard, BsGear, BsHandbag, BsHeart, BsPerson, BsPersonCircle, BsPower } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from '../Layout/Layout';
import { isAdmin, isAuth, logout } from '../LoginRegisterModal/Authentication';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);
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

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/shop' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	return (
		<div className="w-full h-14 fixed top-0 left-0 bg-white border-b shadow-sm border-black/5 z-20">
			<div className="h-full relative px-8 md:px-4 max-w-7xl mx-auto w-full flex items-center justify-between duration-200 ease-in-out">
				<div className="hidden md:block md:w-1/3 cursor-pointer select-none">
					<span onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })} className="text-xl">
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-2/3 md:w-1/3 flex items-center md:justify-center">
					<div className="mr-16 lg:mr-8 md:mr-0 duration-200 ease-in-out">
						<Link to="/" className="text-lg font-bold uppercase tracking-wider">
							Prima vista
						</Link>
					</div>

					<ul
						className={`flex items-center md:flex-col md:justify-center md:absolute md:top-14 md:w-full md:h-screen md:bg-gray-50 ${
							state.mobileToggle ? 'md:opacity-100 md:left-0' : 'md:opacity-0 md:-left-full'
						} duration-300 ease-in-out z-50`}
					>
						{navLinks.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="mx-4 lg:mx-3 md:mx-0 md:my-6 md:block text-xs md:text-lg uppercase text-black hover:text-black/70 duration-200 ease-in-out">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="w-1/3 flex items-center justify-end space-x-6 lg:space-x-4 duration-200 ease-in-out">
					<Link to="/" className="md:hidden block">
						<BsHeart />
					</Link>
					<div ref={menuRef} className="relative cursor-pointer">
						{isAuth() ? (
							<>
								<span onClick={() => setIsVisible(!isVisible)}>
									<BsPersonCircle />
								</span>
								{isVisible && (
									<ul className="absolute right-0 z-10 w-48 mt-4 bg-white border border-gray-200 shadow-md origin-top-right">
										{isAdmin() ? (
											<li>
												<Link to="/" className="py-2 px-4 border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50"></Link>
											</li>
										) : (
											<>
												<li>
													<Link to="/" className="py-2 px-4 border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50">
														<BsPerson />
														<span className="ml-4 text-sm">Profile</span>
													</Link>
												</li>
												<li>
													<Link to="/" className="py-2 px-4 border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50">
														<BsHeart />
														<span className="ml-4 text-sm">My Wish List</span>
													</Link>
												</li>
												<li>
													<Link to="/" className="py-2 px-4 border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50">
														<BsCreditCard />
														<span className="ml-4 text-sm">My Order</span>
													</Link>
												</li>
												<li>
													<Link to="/" className="py-2 px-4 border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50">
														<BsGear />
														<span className="ml-4 text-sm">Change Password</span>
													</Link>
												</li>
											</>
										)}
										<li onClick={logout} className="py-2 px-4 border-t border-gray-200 flex items-center text-black/70 hover:text-black hover:bg-gray-50 cursor-pointer">
											<BsPower />
											<span className="ml-4 text-sm">Logout</span>
										</li>
									</ul>
								)}
							</>
						) : (
							<span className="text-lg" onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
								<BsPerson />
							</span>
						)}
					</div>
					<div className="relative cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: true })}>
						<BsHandbag />
						<span className="text-sm absolute -top-3 -right-3 bg-black text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">0</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
