import React, { useContext } from 'react';
import {
	IoMenuOutline,
	IoCloseOutline,
	IoHeartOutline,
	IoPersonOutline,
	IoBagHandleOutline,
	IoSearchOutline,
	IoPowerOutline,
	IoPersonCircleOutline,
} from 'react-icons/io5';
import { LayoutContext } from '../Layout/Layout';
import { Link } from 'react-router-dom';
import { isAuth } from '../Auth/Authentication';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/' },
		{ label: 'News', to: '/' },
		{ label: 'Notice', to: '/' },
		{ label: 'Q&A', to: '/' },
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
						<Link to="/" className="text-md text-black font-black uppercase tracking-widest">
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
					<span className="md:hidden">
						<IoSearchOutline className="text-xl text-black/80" />
					</span>
					<span className="md:hidden">
						<IoHeartOutline className="text-xl text-black/80" />
					</span>
					<div className="relative cursor-pointer select-none">
						{isAuth() ? (
							<>
								<span>
									<IoPersonCircleOutline className="text-xl text-black/80" />
								</span>
								<ul className="absolute top-10 left-0 w-44 h-auto bg-white border border-gray-200 shadow-sm rounded-sm origin-top-right z-30">
									<li>
										<Link
											to="/"
											className="py-[10px] px-4 flex items-center text-black/75 hover:text-black hover:bg-gray-50 duration-200 ease-in-out"
										>
											<IoPersonOutline />
											<span className="ml-4 text-sm">Profile</span>
										</Link>
									</li>
									<li>
										<div className="border-t border-gray-200 py-[10px] px-4 flex items-center text-black/75 hover:text-black hover:bg-gray-50 duration-200 ease-in-out">
											<IoPowerOutline />
											<span className="ml-4 text-sm">Logout</span>
										</div>
									</li>
								</ul>
							</>
						) : (
							<span onClick={() => dispatch({ type: 'authModal', payload: true })}>
								<IoPersonOutline className="text-xl text-black/80" />
							</span>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<IoBagHandleOutline className="text-xl text-black/80" />
						<span className="absolute -top-3 -right-3 text-sm bg-black text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
							0
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
