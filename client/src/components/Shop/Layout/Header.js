import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsSearch, BsPerson } from 'react-icons/bs';
import { LayoutContext } from './Layout';

const Header = () => {
	const { dispatch } = useContext(LayoutContext);

	const links = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/' },
		{ label: 'Notice', to: '/' },
		{ label: 'Q&A', to: '/' },
		{ label: 'News', to: '/' },
	];
	return (
		<header className="h-16 px-8 md:px-4 bg-white flex items-center justify-between">
			<div className="flex items-end">
				<div>
					<Link to="/" className="text-2xl uppercase font-bold">
						Ambition
					</Link>
				</div>
				<nav className="ml-14">
					<ul className="flex space-x-8 lg:space-x-6 sm:hidden">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link to={`${link.to}`} className="text-xs font-semibold uppercase tracking-wider text-black">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
			<div className="flex space-x-6">
				<div className="md:hidden">
					<BsSearch />
				</div>
				<Link to="/user/wish-list">
					<BsHeart />
				</Link>
				<div className="cursor-pointer select-none">
					<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
						<BsPerson className="text-lg" />
					</span>
				</div>
				<div className="cursor-pointer relative">
					<BsHandbag />
					<span className="absolute -top-3 -right-3 w-6 h-6 bg-black text-white rounded-full border-2 border-white flex justify-center items-center text-sm">0</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
