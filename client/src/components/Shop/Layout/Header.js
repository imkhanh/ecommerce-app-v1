import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsSearch, BsPerson } from 'react-icons/bs';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from '../Layout/Layout';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);

	const menuLinks = [
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
						} duration-300 ease-in-out`}
					>
						{menuLinks.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="mx-4 lg:mx-3 md:mx-0 md:my-6 md:block text-xs md:text-lg uppercase text-black hover:text-black/80 duration-200 ease-in-out">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="w-1/3 flex items-center justify-end space-x-6 lg:space-x-4 duration-200 ease-in-out">
					<div className="lg:hidden block">
						<BsSearch />
					</div>
					<Link to="/" className="md:hidden block">
						<BsHeart />
					</Link>
					<div className="relative cursor-pointer">
						<span className="text-lg" onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
							<BsPerson />
						</span>
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
