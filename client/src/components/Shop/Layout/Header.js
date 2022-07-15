import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs';
import { LayoutContext } from '../Layout/Layout';

const Header = () => {
	const { dispatch } = useContext(LayoutContext);

	const links = [
		{ label: 'Home', to: '/' },
		{ label: 'Products', to: '/products' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/qanda' },
	];

	return (
		<header className="h-14 fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-20">
			<div className="h-full px-16 lg:px-8 md:px-4 grid grid-cols-3 md:grid-cols-2 items-center">
				<div>
					<Link to="/">Hi</Link>
				</div>
				<div className="md:hidden flex justify-center">
					<ul className="flex space-x-10">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link to={link.to} className="text-xs uppercase text-black hover:text-gray-700">
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex justify-end space-x-6">
					<div>
						<BsSearch className="text-lg" />
					</div>
					<div>
						<BsHeart className="text-lg" />
					</div>
					<div>
						<span onClick={() => dispatch({ type: 'authModal', payload: true })} className="cursor-pointer select-none">
							<BsPerson className="text-lg" />
						</span>
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="cursor-pointer select-none">
						<BsHandbag className="text-lg" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
