import React, { useContext, useState } from 'react';
import { LayoutContext } from '../';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			{state.loginRegisterModal && (
				<div>
					<div
						onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })}
						className={`${state.loginRegisterModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-70 w-full h-full z-50`}
					/>
					<div
						className={`${
							state.loginRegisterModal ? '' : 'hidden'
						} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-auto bg-white shadow-md rounded-sm z-[100]`}
					>
						<div className="p-8 space-y-8">
							<div className="text-center">
								<h4 className="mb-4 text-sm text-black font-thin line-through uppercase">onedayonething</h4>
								{isLogin ? <p className="text-2xl uppercase">Your account for everything shop</p> : <p className="text-2xl uppercase">Become a member shop</p>}
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
			)}
		</>
	);
};

export default LoginRegisterModal;
