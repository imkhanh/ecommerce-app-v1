import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from './Layout';
import { BsHeart, BsHandbag, BsSearch, BsPerson } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/shop', label: 'Shop' },
		{ to: '/news', label: 'News' },
		{ to: '/notice', label: 'Notice' },
		{ to: '/qa', label: 'Q&A' },
	];

	return (
		<header className="w-full h-12 fixed top-0 left-0 bg-white border-b border-black/10 z-40">
			<div className="relative px-8 lg:px-4 duration-200 ease-in-out grid grid-cols-2 md:grid-cols-3">
				<div className="hidden md:flex md:items-center">
					<span onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })} className="cursor-pointer select-none text-[22px]">
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="flex items-center md:justify-center">
					<div className="mr-14 lg:mr-8 md:mr-0 duration-200 ease-in-out">
						<Link to="/" className="text-sm text-black font-light uppercase tracking-widest">
							knovv
						</Link>
					</div>
					<nav className="h-12 flex items-center border-black/10 border-x md:border-0">
						<ul
							className={`flex md:flex-col md:p-4 md:absolute md:top-12 md:w-full md:h-screen md:divide-y md:divide-gray-200 ${
								state.mobileToggle ? 'md:delay-150 md:left-0 md:opacity-100 md:bg-gray-50' : 'md:-left-full md:opacity-0 md:bg-white'
							} md:duration-500 md:ease-in-out z-20`}
						>
							{links.map((link, index) => {
								return (
									<li key={index}>
										<Link to={link.to} className="mx-4 md:mx-0 md:my-4 md:block text-black hover:text-black/80 text-xs font-light tracking-widest uppercase">
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>

				<div className="flex items-center justify-end space-x-6 lg:space-x-4 md:mr-4">
					<div className="md:hidden">
						<BsSearch />
					</div>
					<Link to="/user/wish-list" className="md:hidden">
						<BsHeart />
					</Link>
					<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="text-xl elect-none cursor-pointer">
						<BsPerson />
					</div>
					<div className="relative select-none cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: true })}>
						<BsHandbag />
						<span className="absolute -top-3 -right-4 bg-black text-white border-2 border-white w-6 h-6 rounded-full flex items-center justify-center">0</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
