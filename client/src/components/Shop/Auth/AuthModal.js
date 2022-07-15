import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import Input from './Input';

const AuthModal = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const [switchMode, setSwitchMode] = useState(true);
	const [showPass, setShowPass] = useState(true);
	const [userData, setUserData] = useState({ email: '', password: '', fullname: '', username: '', success: '', error: '' });
	const { email, password, fullname, username } = userData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleChangeMode = () => {
		setSwitchMode((prev) => !prev);
		setUserData({ email: '', password: '', fullname: '', username: '', success: '', error: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<div className={`${data.authModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-40`} onClick={() => dispatch({ type: 'authModal', payload: false })}></div>
			<div className={`${data.authModal ? '' : 'hidden'} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-auto bg-white shadow-lg z-50`}>
				<div className="py-4 px-8 text-center space-y-4">
					<span className="text-sm font-bold uppercase">The 1998</span>
					<h1 className="text-2xl font-medium uppercase">{switchMode ? 'Your account for everything' : 'Become a member shop'}</h1>
				</div>

				<form onSubmit={handleSubmit} className="p-8 space-y-4">
					{switchMode ? (
						<>
							<Input label="Email Address" type="text" name="email" value={email} onChange={handleChange} />
							<Input label="Password" type={showPass ? 'text' : 'password'} name="password" value={userData.password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
						</>
					) : (
						<>
							<Input label="Fullname" type="text" name="fullname" value={fullname} onChange={handleChange} />
							<Input label="Username" type="text" name="username" value={username} onChange={handleChange} />

							<Input label="Email Address" type="text" name="email" value={email} onChange={handleChange} />
							<Input label="Password" type={showPass ? 'text' : 'password'} name="password" value={password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
						</>
					)}
					<button type="submit" className="w-full h-10 bg-black text-white text-sm rounded-sm">
						{switchMode ? 'Login' : 'Register'}
					</button>
				</form>

				<div className="py-4 px-8 text-center font-light text-xs cursor-pointer select-none">
					{switchMode ? (
						<p>
							Not a Member?
							<span onClick={handleChangeMode} className="ml-1 font-medium hover:underline">
								Join us
							</span>
						</p>
					) : (
						<p>
							Already an account?
							<span onClick={handleChangeMode} className="ml-1 font-medium hover:underline">
								Login
							</span>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
