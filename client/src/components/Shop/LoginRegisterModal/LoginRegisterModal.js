import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import { loginReq, registerReq } from './FetchApi';
import InputField from './InputField';

const initialState = { name: '', email: '', password: '', success: null, error: null };

const LoginRegisterModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [formData, setFormData] = useState(initialState);
	const [showPass, setShowPass] = useState(false);
	const [switchForm, setSwitchForm] = useState(true);

	if (formData.error || formData.success) {
		setTimeout(() => {
			setFormData({ ...formData, name: '', email: '', password: '', error: null, success: null, loading: false });
		}, 2000);
	}

	const alert = (type, msg) => (
		<div className={`h-10 pl-2 flex items-center bg-${type}-100 text-${type}-500 rounded-sm`}>
			<p className="text-sm">{msg}</p>
		</div>
	);

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
			loading: false,
		});
		setShowPass(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (switchForm) {
			setFormData({ ...formData, loading: true });
			try {
				const res = await loginReq({ email: formData.email, password: formData.password });
				if (res && res.token) {
					setFormData({ ...formData, email: '', password: '', error: null, loading: false });
					localStorage.setItem('user', JSON.stringify(res));
					window.location.href = '/';
				} else {
					setFormData({ ...formData, email: '', password: '', error: res.error, loading: false });
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			setFormData({ ...formData, loading: true });
			try {
				const res = await registerReq({ name: formData.name, email: formData.email, password: formData.password });
				if (res && res.success) {
					setFormData({ ...formData, name: '', email: '', password: '', error: null, success: res.success, loading: false });
				} else {
					setFormData({ ...formData, name: '', email: '', password: '', error: null, success: null, loading: false });
				}
			} catch (error) {
				console.log(error);
			}
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
					{formData.success && alert('green', formData.success)}
					{formData.error && alert('red', formData.error)}
					{switchForm ? (
						<>
							<InputField label="Email address" type="text" name="email" value={formData.email} onChange={handleChange} />
							<InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
						</>
					) : (
						<>
							<InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
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
