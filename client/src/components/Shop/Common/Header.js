import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPerson, BsHeart, BsHandbag } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from '..';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const menuLinks = [
		{ id: 1, label: 'Home', to: '/' },
		{ id: 2, label: 'Shop', to: '/shop' },
		{ id: 3, label: 'News', to: '/' },
		{ id: 4, label: 'Notice', to: '/notice' },
		{ id: 5, label: 'Q&A', to: '/qa' },
	];

	const menuLink = menuLinks.map((link) => {
		return (
			<li key={link.id}>
				<Link
					to={link.to}
					className="block mx-6 lg:mx-4 md:mx-0 md:my-4 text-xs md:text-lg font-normal md:font-medium text-black/70 hover:text-black uppercase "
				>
					{link.label}
				</Link>
			</li>
		);
	});

	return (
		<header className="w-full fixed top-0 inset-x-0 border-b border-black/10 bg-white z-20">
			<div className="h-14 px-8 lg:px-4 flex items-center justify-between duration-200 ease-in-out">
				<div className="hidden md:block md:w-1/3">
					<span
						onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })}
						className="text-[22px] text-black/50 hover:text-black cursor-pointer select-none"
					>
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-1/3 md:flex md:justify-center">
					<Link to="/" className="text-xl md:text-lg text-black font-extrabold uppercase">
						Blancos
					</Link>
				</div>
				<ul
					className={`w-1/3 flex items-center justify-center md:flex-col  md:absolute md:top-14 md:w-full md:h-screen ${
						state.mobileToggle ? 'md:left-0 md:bg-gray-50' : 'md:-left-full'
					} duration-300 ease-in-out z-20`}
				>
					{menuLink}
				</ul>
				<div className="w-1/3 flex items-center justify-end space-x-6 lg:space-x-4 duration-200 ease-in-out select-none">
					<div>
						<span>
							<BsHeart />
						</span>
					</div>
					<div className="cursor-pointer">
						<span onClick={() => dispatch({ type: 'authToggle', payload: true })}>
							<BsPerson />
						</span>
					</div>
					<div onClick={() => dispatch({ type: 'cartToggle', payload: true })} className="relative cursor-pointer">
						<BsHandbag />
						<span className="absolute -top-4 -right-4 w-6 h-6 bg-black text-white text-sm font-medium rounded-full flex items-center justify-center border-2 border-white">
							0
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
