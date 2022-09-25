import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsPerson, BsHandbag, BsSearch } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from '..';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/shop' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/qa' },
	];

	return (
		<header className="h-16 fixed top-0 inset-x-0 bg-white border-b border-black/10 z-20">
			<div className="h-full px-8 lg:px-4 flex items-center justify-between">
				<div className="hidden md:block md:w-1/3">
					<span onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })} className=" text-[22px] cursor-pointer select-none">
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-1/3 flex items-end md:w-full md:justify-center">
					<div className="flex items-center mr-12 md:mr-0">
						<Link to="/" className="text-xl uppercase font-normal">
							Blancos
						</Link>
					</div>
					<ul
						className={`flex md:absolute md:top-16  md:w-full  md:flex-col md:items-center md:justify-center md:h-screen ${
							state.mobileToggle ? 'md:left-0 md:bg-gray-100 md:opacity-100' : 'md:-left-full md:opacity-0'
						} duration-300 ease-in-out z-50`}
					>
						{navLinks.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="mx-4 md:block md:mx-0 md:my-6 text-sm md:text-lg font-medium tracking-wide">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="w-1/3 flex items-center justify-end select-none space-x-6 md:space-x-4">
					<div className="md:hidden">
						<span>
							<BsSearch />
						</span>
					</div>
					<div className="md:hidden">
						<span>
							<BsHeart />
						</span>
					</div>
					<div className="relative cursor-pointer">
						<span onClick={() => dispatch({ type: 'authModal', payload: true })}>
							<BsPerson />
						</span>
					</div>
					<div className="relative cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: true })}>
						<BsHandbag />
						<span className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-black text-white border-2 border-white flex items-center justify-center text-sm">
							0
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
