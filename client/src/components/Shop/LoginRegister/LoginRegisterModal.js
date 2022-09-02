import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { LayoutContext } from '../Layout/Layout';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [switchMode, setSwitchMode] = useState(true);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })} className={`${state.loginRegisterModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 w-full h-full z-40`} />
			<div className={`${state.loginRegisterModal ? '' : 'hidden'} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-auto bg-white rounded-sm shadow-lg z-50`}>
				<div className="p-8 flex flex-col text-center space-y-4">
					<h1 className="uppercase font-black">LMF</h1>
					{switchMode ? (
						<h4 className="text-2xl uppercase font-medium tracking-wide">Your Account for everything shop</h4>
					) : (
						<h4 className="text-2xl uppercase font-medium tracking-wide">Become a member shop</h4>
					)}
				</div>
				{switchMode ? <Login /> : <Register />}

				<div onClick={() => setSwitchMode(!switchMode)} className="py-6 flex items-center justify-center border-t border-gray-200">
					<p className="text-sm font-light text-black/50 hover:text-black hover:underline cursor-pointer">{switchMode ? 'Not a Member? Join us' : 'Already an account? Login'}</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
