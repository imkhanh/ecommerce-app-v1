import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div>
			<div className={`${data.authModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-40`} onClick={() => dispatch({ type: 'authModal', payload: false })}></div>
			<div className={`${data.authModal ? '' : 'hidden'} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-auto bg-white shadow-lg rounded-md z-50`}>
				<div className="p-4 text-center space-y-4">
					<span className="text-sm font-bold uppercase">ONE+</span>
					<h1 className="text-2xl font-semibold uppercase">{login ? 'Your account for everything' : 'Become a member shop'}</h1>
				</div>
				{login ? <Login /> : <Register />}
				<div className="p-4 text-center font-light text-black/90 text-xs">
					{login ? (
						<p>
							Not a Member?
							<span onClick={() => setLogin(!login)} className="ml-1 text-black font-medium hover:underline cursor-pointer select-none">
								Join us
							</span>
						</p>
					) : (
						<p>
							Already an account?
							<span onClick={() => setLogin(!login)} className="ml-1 text-black font-medium hover:underline cursor-pointer select-none">
								Login
							</span>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
