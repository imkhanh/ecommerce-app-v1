import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import Overlay from '../Common/Overlay';
import { LayoutContext } from '..';

const AuthModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div className="relative">
			<Overlay state={state.authToggle} dispatch={() => dispatch({ type: 'authToggle', payload: false })} />
			<div
				className={`${
					state.authToggle ? '' : 'hidden'
				} fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-sm w-full rounded-sm shadow-lg bg-white z-[70]`}
			>
				<div className="mb-8 py-4 px-8 flex flex-col items-center justify-center space-y-4">
					<h4 className="text-black font-bold">Blancos</h4>
					<p className="text-center text-[22px] text-black font-medium uppercase leading-5">
						{login ? 'Your account for everything shop' : 'Become a member shop'}
					</p>
				</div>

				<div className="mb-8 px-12">{login ? <Login /> : <Register />}</div>
				<div className="py-6 border-t border-black/10 flex items-center justify-center">
					<p className="text-xs text-black/50 font-light">
						{login ? 'Not a member?' : 'Already an account?'}
						<span
							onClick={() => setLogin(!login)}
							className="ml-1 text-black underline underline-offset-2 cursor-pointer"
						>
							{login ? 'Create an account' : 'Login'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
