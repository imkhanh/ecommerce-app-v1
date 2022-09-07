import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoHeartOutline, IoCartOutline, IoPersonOutline, IoPowerOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
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
		{ to: '/products', label: 'Products' },
		{ to: '/news', label: 'News' },
		{ to: '/notice', label: 'Notice' },
		{ to: '/question-and-answer', label: 'Q&A' },
	];
	return (
		<header className="h-14 w-full fixed top-0 left-0 bg-white border-b border-gray-200 z-50">
			<div className="md:relative container h-full flex items-center justify-between">
				<div className="md:w-1/3 hidden md:block cursor-pointer select-none">
					<span onClick={() => dispatch({ type: 'mobileToggle', payload: !state.mobileToggle })} className="text-xl">
						{state.mobileToggle ? <IoCloseOutline /> : <IoMenuOutline />}
					</span>
				</div>
				<div className="w-2/3 md:w-1/3 flex items-center md:justify-center">
					<div className="mr-10 lg:mr-2 md:mr-0 transition-all">
						<Link to="/" className="text-sm text-black font-thin line-through uppercase">
							onedayonething
						</Link>
					</div>
					<ul
						className={`flex md:flex-col md:items-center md:justify-center md:absolute md:top-14 md:w-full md:h-screen ${
							state.mobileToggle ? 'md:delay-150 md:left-0 md:opacity-100 md:bg-gray-100' : 'md:-left-full md:opacity-0 md:bg-white'
						} md:duration-500 md:ease-in-out z-20`}
					>
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link
										to={link.to}
										className="link relative mx-4 lg:mx-3 md:mx-0 md:my-6 md:block text-black hover:text-black/80 text-xs md:text-xl uppercase font-normal md:font-medium md:tracking-widest"
									>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="w-1/3 flex items-center justify-end space-x-6 md:space-x-4 md:mr-[14px]">
					<div className="md:hidden">
						<IoSearchOutline />
					</div>
					<div className="md:hidden">
						<IoHeartOutline />
					</div>
					<div ref={menuRef} className="relative cursor-pointer">
						{!auth ? (
							<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
								<IoPersonOutline />
							</span>
						) : (
							<>
								<span onClick={() => setIsVisible(!isVisible)}>
									<IoPersonOutline />
								</span>
								{isVisible && (
									<ul className="absolute top-10 left-0 transform -translate-x-[70%] w-48 h-auto bg-white border border-gray-200 rounded-sm shadow-md z-20">
										<li>
											<Link to="/user/profile" className="py-2 px-4 text-sm flex text-black/70 hover:text-black items-center bg-white hover:bg-gray-50">
												<IoPersonOutline />
												<span className="ml-4">Profile</span>
											</Link>
										</li>
										<li>
											<span className="py-2 px-4 text-sm flex text-black/70 hover:text-black items-center bg-white hover:bg-gray-50 select-none">
												<IoPowerOutline />
												<span className="ml-4">Logout</span>
											</span>
										</li>
									</ul>
								)}
							</>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer">
						<IoCartOutline />
						<span className="absolute -top-3 -right-4 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white bg-black text-sm">0</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
