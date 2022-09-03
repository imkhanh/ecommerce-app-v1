import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from './Layout';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	return (
		<header className="h-14 px-8 md:px-4 flex items-center justify-between border-b border-gray-100 bg-white z-30 transition-all">
			<div className="md:w-1/3 md:block hidden">
				<span className="text-2xl text-black/80 hover:text-black cursor-pointer select-none" onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })}>
					{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
				</span>
			</div>

			<div className="w-1/3 md:flex md:justify-center">
				<Link to="/" className="text-sm font-black text-black uppercase">
					<span>Prima vista</span>
				</Link>
			</div>

			<nav className="md:hidden w-1/3 flex items-center justify-center list-none space-x-12 lg:space-x-10 md:space-x-8">
				{navLinks.map((link, index) => {
					return (
						<li key={index}>
							<Link to={link.to} className="text-xs uppercase hover:text-black font-light text-black/80 tracking-wide transition-colors">
								{link.label}
							</Link>
						</li>
					);
				})}
			</nav>

			<div className="w-1/3 flex items-center justify-end space-x-6 md:space-x-4">
				<div className="md:hidden">
					<BsSearch />
				</div>
				<div className="md:hidden">
					<BsHeart />
				</div>
				<div className="cursor-pointer select-none">
					<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
						<BsPerson />
					</span>
				</div>
				<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
					<BsHandbag />
					<span className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center bg-black text-white border-2 border-white text-sm font-medium">0</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
