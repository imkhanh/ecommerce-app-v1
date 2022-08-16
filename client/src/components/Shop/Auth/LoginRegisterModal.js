import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { LayoutContext } from '../Layout/Layout';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })} className={`${state.loginRegisterModal ? '' : 'hidden'} fixed inset-0 bg-black/50 z-20`} />
			<div className={`${state.loginRegisterModal ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-sm w-full h-auto rounded-sm shadow-lg z-50`}>
				<div className="py-8 px-12 space-y-8">
					<div className="space-y-4">
						<h4 className="text-center text-lg font-black uppercase tracking-widest" style={{ fontFamily: 'Bigilla' }}>
							Ambit
						</h4>
						<p className="text-center text-xl uppercase font-medium">{login ? 'Your account for everything shop' : 'Become a member shop'}</p>
					</div>

					{login ? <Login /> : <Register />}

					<div>
						<p onClick={() => setLogin(!login)} className="text-xs text-center text-black/50 hover:text-black hover:underline cursor-pointer select-none">
							{login ? 'Not a Member? Join us' : 'Already an account? Login'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
