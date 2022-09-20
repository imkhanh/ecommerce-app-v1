import React, { useContext, useState } from 'react';
import { LayoutContext } from '..';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div className="relative z-[100]">
			<div
				onClick={() => dispatch({ type: 'authModal', payload: false })}
				className={`${state.authModal ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black  bg-opacity-70`}
			/>
			<div className={`${state.authModal ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
				<div className="p-8 w-[384px] h-auto rounded-sm bg-white shadow-lg space-y-8">
					<div className="text-center">
						<h1 className="mb-4 text-xl font-black">.K</h1>
						<p className="text-[22px] uppercase font-medium leading-6">{login ? 'Your account for everything shop' : 'Become a member shop'}</p>
					</div>

					<div className="px-6">{login ? <Login /> : <Register />}</div>

					<div className="text-center">
						<p onClick={() => setLogin(!login)} className="text-xs font-light text-black/60">
							{login ? 'Not a member ?' : 'Already an account ?'}
							<span className="ml-1 text-black font-normal underline underline-offset-2 cursor-pointer select-none">{login ? 'Join us' : 'Login'}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
