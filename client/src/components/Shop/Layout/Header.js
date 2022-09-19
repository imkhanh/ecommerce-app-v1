import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsPerson } from 'react-icons/bs';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { LayoutContext } from './Layout';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const navLinks = [
		{ label: 'Shop', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/qa' },
	];

	return (
		<header className="h-14 fixed top-0 inset-x-0 w-full bg-white border-b border-gray-100 shadow-sm z-50">
			<div className="h-full px-8 md:px-4 flex items-center justify-between">
				<div className="hidden md:block md:w-1/4">
					<span
						className="text-xl text-black/60 hover:text-black cursor-pointer select-none transition-colors"
						onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })}
					>
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-1/4 md:w-2/4 md:flex md:justify-center">
					<Link to="/" className="text-xl font-black">
						.K
					</Link>
				</div>
				<ul
					className={`w-2/4 flex justify-center md:fixed md:top-14 md:w-full md:h-screen md:bg-gray-50 md:flex-col md:items-center ${
						state.mobileToggle ? ' md:left-0 md:opacity-100' : 'md:-left-full md:opacity-0'
					}  duration-300 ease-in-out`}
				>
					{navLinks.map((link, index) => {
						return (
							<li key={index}>
								<Link
									to={link.to}
									className="inline-block mx-4 md:my-4 text-xs md:text-lg font-light md:font-bold text-black hover:text-black md:hover:text-black/60 uppercase transition-colors"
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
					<div className="relative cursor-pointer select-none">
						<span className="text-base" onClick={() => dispatch({ type: 'authModal', payload: true })}>
							<BsPerson />
						</span>
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag />
						<span className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center border-2 border-white">
							0
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
