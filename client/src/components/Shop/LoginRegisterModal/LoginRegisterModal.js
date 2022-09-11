import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import InputField from './InputField';

const initialState = { fullname: '', username: '', email: '', password: '', success: null, error: null };

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [formData, setFormData] = useState(initialState);
	const [showPass, setShowPass] = useState(false);
	const [switchForm, setSwitchForm] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSwitchForm = () => {
		setSwitchForm((prev) => !prev);
		setFormData({
			fullname: '',
			username: '',
			email: '',
			password: '',
			success: null,
			error: null,
		});
		setShowPass(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (switchForm) {
			console.log('login');
		} else {
			console.log('register');
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })} className={`${state.loginRegisterModal ? '' : 'hidden'} fixed inset-0 bg-black w-full h-full opacity-70 z-40`} />
			<div className={`${state.loginRegisterModal ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white max-w-sm w-full h-auto rounded-sm shadow-lg z-50`}>
				<div className="pt-8 text-center space-y-4">
					<h4 className="uppercase text-sm font-extrabold">Prima vista</h4>
					{switchForm ? (
						<p className="text-[22px] uppercase font-medium">
							Your account <br /> for everything shop
						</p>
					) : (
						<p className="text-[22px] uppercase font-medium">Become a member shop</p>
					)}
				</div>

				<form onSubmit={handleSubmit} className="py-8 px-12 space-y-4">
					{/* <div className="h-10 px-2 flex items-center bg-red-100 text-red-500 rounded-sm">
						<p className="text-sm">Error</p>
					</div> */}
					{switchForm ? (
						<>
							<InputField label="Email address" type="text" name="email" value={formData.email} onChange={handleChange} />
							<InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
						</>
					) : (
						<>
							<InputField label="Full name" type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
							<InputField label="User name" type="text" name="username" value={formData.username} onChange={handleChange} />
							<InputField label="Email address" type="text" name="email" value={formData.email} onChange={handleChange} />
							<InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
						</>
					)}

					<p className="py-4 px-8 text-xs text-center font-light text-black/40">
						{switchForm ? 'By logging in, you agree to Flex Privacy Policy and Terms of Use.' : 'By creating an account, you agree to Flex Privacy Policy and Terms of Use.'}
					</p>

					<button type="submit" className="text-sm w-full h-10 bg-black hover:bg-black/80 border border-black text-white uppercase font-normal tracking-wide rounded-sm duration-200 ease-in-out">
						{switchForm ? 'Login' : 'Register'}
					</button>
				</form>

				<div className="pb-8">
					<p className="text-xs text-center font-light text-black/50">
						{switchForm ? 'Not a Member?' : 'Already an account?'}
						<span onClick={() => handleSwitchForm()} className="ml-1 text-black cursor-pointer select-none">
							{switchForm ? 'Join us' : 'Login'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;
