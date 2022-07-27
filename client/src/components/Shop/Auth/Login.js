import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({ email: '', password: '', isSubmitting: false, error: null });
	const { email, password, isSubmitting } = userData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUserData({ ...userData, isSubmitting: true });

		try {
			const res = await axios.post('/api/login', { email, password });
			setUserData({ ...userData, isSubmitting: false });

			localStorage.setItem('jwt', JSON.stringify(res.data.token));
			localStorage.setItem('user', JSON.stringify(res.data.user));

			window.location.href = '/';
		} catch (error) {
			setUserData({ ...userData, email: '', password: '', error: error.response.data.msg });
			setTimeout(() => setUserData({ ...userData, mail: '', password: '', error: '' }), 2000);
		}
	};

	return (
		<div className="px-12">
			{userData.error && (
				<div className="px-2 h-10 flex items-center border-l-2 border-red-500 bg-red-100 text-red-500">
					<p className="text-sm">{userData.error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="py-6">
				<div className="mb-4">
					<label className="block mb-1 text-xs text-black/70">Email Address</label>
					<div className="relative">
						<input
							type="text"
							name="email"
							value={email}
							onChange={handleChange}
							className="px-2 text-sm w-full h-10 border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
						/>
					</div>
				</div>
				<div>
					<label className="block mb-1 text-xs text-black/70">Password</label>
					<div className="relative">
						<input
							type={showPass ? 'text' : 'password'}
							name="password"
							value={password}
							onChange={handleChange}
							className="px-2 text-sm w-full h-10 border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
						/>

						<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black">
							{showPass ? <BsEyeSlashFill className="text-sm" /> : <BsEyeFill className="text-sm" />}
						</span>
					</div>
				</div>
				<div className="my-8 px-4">
					<p className="text-xs text-center text-black/70 font-light">By logging in, you agree to Ambition's Privacy Policy and Terms of Use.</p>
				</div>
				<button type="submit" disabled={isSubmitting} className="w-full h-10 bg-black text-white text-xs uppercase tracking-wide font-medium rounded-[3px]">
					{isSubmitting ? 'Loading' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
