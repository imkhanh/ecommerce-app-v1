import React, { useContext, useState } from 'react';
import { LayoutContext } from '../';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className={`${state.loginRegisterModal ? '' : 'pointer-events-none'}`}>
			<div
				onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })}
				className={`fixed inset-0 ${state.loginRegisterModal ? 'bg-black opacity-70' : 'opacity-0'}  w-full h-full  duration-300 ease-in-out z-50`}
			/>
			<div
				className={`fixed top-1/2 left-1/2 max-w-sm w-full h-auto transform -translate-x-1/2 -translate-y-1/2 ${
					state.loginRegisterModal ? 'delay-150 bg-white opacity-100' : 'opacity-0'
				} shadow-md rounded-sm z-[100] duration-500 ease-in-out`}
			>
				<div className="py-8 px-12 space-y-8">
					<div className="text-center">
						<h4 className="mb-4 text-sm text-black font-thin line-through uppercase">onedayonething</h4>
						{isLogin ? <p className="text-[22px] uppercase">Your account for everything shop</p> : <p className="text-[22px] uppercase">Become a member shop</p>}
					</div>
					{isLogin ? <LoginForm /> : <RegisterForm />}
					<div className="flex items-center justify-center">
						{isLogin ? (
							<p className="text-xs font-light">
								Not a member?
								<span onClick={() => setIsLogin(!isLogin)} className="ml-1 hover:text-black hover:underline cursor-pointer">
									Join us
								</span>
							</p>
						) : (
							<p className="text-xs font-light">
								Already an account?
								<span onClick={() => setIsLogin(!isLogin)} className="ml-1 hover:text-black hover:underline cursor-pointer">
									Login
								</span>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
