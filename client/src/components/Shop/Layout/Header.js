import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs';
import { LayoutContext } from './Layout';

const Header = () => {
	const { dispatch } = useContext(LayoutContext);

	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	return (
		<header className="h-16 w-full fixed top-0 border-b border-gray-100 bg-white z-30">
			<div className="h-full max-w-[1200px] mx-auto flex items-center justify-between">
				<div className="flex items-center">
					<div className="mr-24">
						<Link to="/" className="text-lg font-black">
							LMF
						</Link>
					</div>
					<nav className="flex list-none space-x-12">
						{navLinks.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="text-sm text-black hover:text-black/80">
										{link.label}
									</Link>
								</li>
							);
						})}
					</nav>
				</div>

				<div className="flex items-center space-x-8">
					<div>
						<BsSearch />
					</div>
					<div>
						<BsHeart />
					</div>
					<div className="cursor-pointer select-none">
						<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
							<BsPerson />
						</span>
					</div>
					<div className="relative cursor-pointer select-none">
						<BsHandbag />
						<span className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center bg-black text-white border-2 border-white text-sm font-medium">0</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
