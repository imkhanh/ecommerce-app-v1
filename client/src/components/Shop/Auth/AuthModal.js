import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'authModal', payload: false })}
				className={`${state.authModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-70 w-full h-full z-40`}
			/>
			<div
				className={`${
					state.authModal ? '' : 'hidden'
				} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-sm w-full h-auto rounded-sm shadow-lg z-50`}
			>
				<div className="py-8 px-12 text-center space-y-4">
					<h4 className="text-sm text-black font-black uppercase">FLEX</h4>
					<p className="text-[22px] text-black font-medium uppercase leading-6">
						{isLogin ? 'Your account for everything shop' : 'Become a member shop'}
					</p>
				</div>

				{isLogin ? <Login /> : <Register />}

				<div className="py-8 px-12">
					<p className="text-xs font-light text-black/50 text-center">
						{isLogin ? 'Not a Member?' : 'Already a Member?'}{' '}
						<span onClick={() => setIsLogin(!isLogin)} className="text-black font-medium underline cursor-pointer select-none">
							{isLogin ? 'Join us' : 'Login'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
