import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsApp, BsBagCheck, BsGear, BsHandbag, BsHeart, BsPerson, BsPersonCircle, BsPower, BsSearch } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { isAdmin, isAuth, logout } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';
import useClickOutSide from '../Utils/useClickOutSide';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const { divRef, isVisible, setIsVisible } = useClickOutSide();

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/shop' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-a-answer' },
	];

	return (
		<header className="h-14 fixed top-0 inset-x-0 bg-white border-b border-gray-100 shadow-sm z-20">
			<div className="px-8 lg:px-4 h-full max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 items-center duration-200 ease-in-out">
				<div className="hidden md:block">
					<span
						className="text-xl text-black/60 hover:text-black cursor-pointer select-none"
						onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })}
					>
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="flex items-center md:justify-center">
					<div>
						<Link to="/" className="text-md text-[#000] font-black uppercase tracking-widest">
							Flex
						</Link>
					</div>
					<nav className="ml-24 lg:ml-16 md:ml-0">
						<ul
							className={`flex md:flex-col md:fixed md:left-0 md:top-14 md:bg-gray-50 md:w-full md:h-screen ${
								state.mobileToggle ? 'md:left-0 md:opacity-100 md:delay-150' : 'md:-left-full md:opacity-0'
							} duration-300 ease-in-out md:z-20`}
						>
							{navLinks.map((link, index) => {
								return (
									<li key={index}>
										<Link
											to={link.to}
											className="block md:px-4 mx-4 md:mx-0 md:my-3 text-xs font-light uppercase text-black hover:text-black/80 duration-200 ease-in-out"
										>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
				<div className="flex justify-end space-x-6 lg:space-x-4 duration-200 ease-in-out">
					<div className="md:hidden">
						<BsSearch />
					</div>
					<div className="md:hidden">
						<Link to="/user/wish-list">
							<BsHeart />
						</Link>
					</div>
					<div ref={divRef} className="relative cursor-pointer select-none">
						{isAuth() ? (
							<>
								<span onClick={() => setIsVisible(!isVisible)}>
									<BsPersonCircle />
								</span>
								{isVisible && (
									<ul className="absolute top-12 -right-10 w-52 h-auto bg-white border border-gray-100 shadow-md rounded-sm origin-top-right z-30">
										{isAdmin() ? (
											<li>
												<Link
													to="/admin/dashboard"
													className="m-2 py-2 px-4 flex items-center text-black/75 hover:text-black rounded-md hover:bg-gray-50 duration-200 ease-in-out"
												>
													<BsApp />
													<span className="ml-4 text-sm sm:text-xs">Admin</span>
												</Link>
											</li>
										) : (
											<>
												<li>
													<Link
														to="/user/profile"
														className="m-2 py-2 px-4 flex items-center text-black/75 hover:text-black rounded-md hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsPerson />
														<span className="ml-4 text-sm sm:text-xs">Profile</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/order-list"
														className="m-2 py-2 px-4 flex items-center text-black/75 hover:text-black rounded-md hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsBagCheck />
														<span className="ml-4 text-sm sm:text-xs">My Order</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/wish-list"
														className="m-2 py-2 px-4 flex items-center text-black/75 hover:text-black rounded-md hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsHeart />
														<span className="ml-4 text-sm sm:text-xs">My Wish List</span>
													</Link>
												</li>
												<li>
													<Link
														to="/user/change-password"
														className="m-2 py-2 px-4 flex items-center text-black/75 hover:text-black rounded-md hover:bg-gray-50 duration-200 ease-in-out"
													>
														<BsGear />
														<span className="ml-4 text-sm sm:text-xs">Change Password</span>
													</Link>
												</li>
											</>
										)}
										<li className="border-t border-gray-200 ">
											<div
												onClick={() => logout()}
												className="m-2 py-2 px-4 flex items-center text-black/75 rounded-md hover:text-red-500 hover:bg-red-50 duration-200 ease-in-out"
											>
												<BsPower />
												<span className="ml-4 text-sm sm:text-xs">Logout</span>
											</div>
										</li>
									</ul>
								)}
							</>
						) : (
							<span onClick={() => dispatch({ type: 'authModal', payload: true })}>
								<BsPerson className="text-lg" />
							</span>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag />
						{state.carts.length > 0 && (
							<span className="absolute -top-3 -right-3 text-sm bg-black text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
								{state.carts && state.carts.length}
							</span>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
