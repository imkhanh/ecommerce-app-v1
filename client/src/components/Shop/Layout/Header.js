import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from './Layout';

const Header = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [isVisible, setIsVisible] = useState(false);
	const [auth, setAuth] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick, true);
		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/shop', label: 'Shop' },
		{ to: '/news', label: 'News' },
		{ to: '/notice', label: 'Notice' },
	];
	return (
		<header className="w-full fixed top-0 left-0 bg-white border-b border-black/10 z-50">
			<div className="md:relative px-8 lg:px-4 duration-200 ease-in-out flex items-center justify-between">
				<div className="flex items-center md:justify-center">
					<div className="mr-14 lg:mr-8 md:mr-0 duration-200 ease-in-out">
						<Link to="/" className="text-sm text-black font-light line-through uppercase tracking-widest">
							onedayonething
						</Link>
					</div>
					<div className="h-12 flex items-center border-black/10 border-x md:border-0">
						<ul
							className={`flex md:flex-col md:items-center md:justify-center md:absolute md:top-12 md:w-full md:h-screen ${
								state.mobileToggle ? 'md:delay-150 md:left-0 md:opacity-100 md:bg-gray-100' : 'md:-left-full md:opacity-0 md:bg-white'
							} md:duration-500 md:ease-in-out z-20`}
						>
							{links.map((link, index) => {
								return (
									<li key={index}>
										<Link
											to={link.to}
											className="mx-4 lg:mx-3 md:mx-0 md:my-6 md:block text-black hover:text-black/80 text-xs font-light md:text-xl uppercase md:font-medium md:tracking-widest"
										>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="h-12 flex items-center justify-end border-x border-black/10 divide-x divide-black/10">
					<Link to="/user/wish-list" className="md:hidden p-3 ">
						<span className="text-black hover:text-black/80 text-xs font-light uppercase">Wish List (0)</span>
					</Link>
					<div ref={menuRef} className="relative p-3 ">
						{auth ? (
							<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="text-black hover:text-black/80 text-xs font-light uppercase cursor-pointer">
								Account
							</span>
						) : (
							<>
								<span onClick={() => setIsVisible(!isVisible)} className="text-black hover:text-black/80 text-xs font-light uppercase cursor-pointer">
									Wellcome
								</span>
								{isVisible && (
									<ul className="absolute top-14 left-1/2 transform -translate-x-1/2 w-44 h-auto bg-white border border-gray-200 rounded-sm shadow-sm z-20">
										<li>
											<Link to="/user/profile" className="py-2 px-4 text-sm flex text-black/70 hover:text-black items-center bg-white hover:bg-gray-50">
												<span className="ml-4">Profile</span>
											</Link>
										</li>
										<li>
											<span className="py-2 px-4 text-sm flex text-black/70 hover:text-black items-center bg-white hover:bg-gray-50 select-none">
												<span className="ml-4">Logout</span>
											</span>
										</li>
									</ul>
								)}
							</>
						)}
					</div>
					<div className="p-3 ">
						<span onClick={() => dispatch({ type: 'cartModal', payload: true })} className="text-black hover:text-black/80 text-xs font-light uppercase cursor-pointer">
							Cart (0)
						</span>
					</div>
					<div className="hidden md:block md:p-3">
						<span onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })} className="cursor-pointer select-none text-xl">
							{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
