import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { LayoutContext } from '../Layout/Layout';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })} className={`${state.loginRegisterModal ? '' : 'hidden'} fixed inset-0 bg-black/30 z-20`} />
			<div className={`${state.loginRegisterModal ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-sm w-full h-auto rounded-sm shadow-lg z-50`}>
				{login ? <Login /> : <Register />}

				<div onClick={() => setLogin(!login)} className="py-8 px-12 text-center">
					<p className="text-xs text-black/50 hover:text-black hover:underline cursor-pointer select-none">{login ? 'Not a Member? Join us' : 'Already an account? Login'}</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
