import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import Login from './Login';
import Register from './Register';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })}
				className={`${
					state.loginRegisterModal
						? 'pointer-events-auto bg-[#00000074] opacity-100'
						: 'opacity-0 pointer-events-none'
				} fixed inset-0 transition duration-300 ease-in-out z-50`}
			/>
			<div
				className={`${
					state.loginRegisterModal ? 'pointer-events-auto opacity-100' : 'opacity-0 pointer-events-none'
				} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-sm w-full h-auto rounded-sm shadow-lg transition duration-300 ease-in-out z-[60] `}
			>
				<div className="py-4 px-12 text-center space-y-4">
					<span className="text-sm uppercase font-black tracking-widest text-center">Ambition</span>
					<h1 className="text-[22px] uppercase font-semibold text-black">
						{login ? 'You account for everything shop' : 'Become a member shop'}
					</h1>
				</div>

				{login ? <Login /> : <Register />}

				<div className="py-6 text-center font-light text-black/90 text-xs">
					<p>
						{login ? 'Do you have an account?' : 'Already an account?'}
						<span
							onClick={() => setLogin(!login)}
							className="ml-1 text-black font-medium hover:underline cursor-pointer select-none"
						>
							{login ? 'Register' : 'Login'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
