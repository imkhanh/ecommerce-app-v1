import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHandbag, BsHeart, BsSearch, BsPerson } from 'react-icons/bs';

const Header = () => {
	const [click, setClick] = useState(false);

	const menuLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Shop', to: '/shop' },
		{ label: 'News', to: '/news' },
		{ label: 'Notice', to: '/notice' },
		{ label: 'Q&A', to: '/question-and-answer' },
	];

	return (
		<div className="h-12 w-full fixed top-0 left-0 bg-white border border-black/10 z-20">
			<div className="relative px-8 md:px-4 h-full max-w-7xl mx-auto w-full flex items-center justify-between duration-200 ease-in-out">
				<div className="hidden md:block cursor-pointer">
					<span onClick={() => setClick(!click)}>{click ? 'Close' : 'Menu'}</span>
				</div>
				<div className="flex items-center">
					<div className="mr-20 lg:mr-12 md:mr-0 duration-200 ease-in-out">
						<Link to="/" className="text-sm font-bold uppercase tracking-widest">
							Flex
						</Link>
					</div>

					<ul
						className={`flex items-center md:flex-col md:justify-center md:absolute md:top-12 md:w-full md:h-screen md:bg-gray-100 ${
							click ? 'md:opacity-100 md:left-0' : 'md:opacity-0 md:-left-full'
						} duration-300 ease-in-out`}
					>
						{menuLinks.map((link, index) => {
							return (
								<li key={index}>
									<Link
										to={link.to}
										className="mx-6 lg:mx-4 md:mx-0 md:my-6 md:block text-xs md:text-lg uppercase font-light md:font-medium text-black hover:text-black/80  duration-200 ease-in-out"
									>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="flex items-center justify-end space-x-6 lg:space-x-4 duration-200 ease-in-out">
					<div className="md:hidden block">
						<span>
							<BsSearch />
						</span>
					</div>
					<div className="md:hidden block">
						<span>
							<BsHeart />
						</span>
					</div>
					<div className="">
						<span className="text-lg">
							<BsPerson />
						</span>
					</div>
					<div className="relative">
						<span>
							<BsHandbag />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
