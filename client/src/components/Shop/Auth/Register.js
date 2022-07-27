import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		fullname: '',
		username: '',
		isSubmitting: false,
		success: null,
		error: null,
	});
	const { email, password, fullname, username, isSubmitting } = userData;

	const alert = (type, msg) => {
		return (
			<div className={`px-2 h-10 flex items-center border-l-2 border-${type}-500 bg-${type}-100 text-${type}-500`}>
				<p className="text-sm">{msg}</p>
			</div>
		);
	};

	if (userData.success || userData.error) {
		setTimeout(() => setUserData({ ...userData, fullname: '', username: '', email: '', password: '', isSubmitting: false, success: null, error: null }), 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUserData({ ...userData, isSubmitting: true });

		try {
			const res = await axios.post('/api/register', { email, password, fullname, username });

			setUserData({
				...userData,
				fullname: '',
				username: '',
				email: '',
				password: '',
				isSubmitting: false,
				success: res.data.msg,
				error: null,
			});
		} catch (error) {
			setUserData({
				...userData,
				fullname: '',
				username: '',
				email: '',
				password: '',
				isSubmitting: false,
				success: null,
				error: error.response.data.msg,
			});
		}
	};

	return (
		<div className="px-12">
			{userData.error && alert('red', userData.error)}
			{userData.success && alert('green', userData.success)}
			<form onSubmit={handleSubmit} className="py-6">
				<div className="mb-4">
					<label className="block mb-1 text-xs text-black/70">Full Name </label>
					<input
						type="text"
						name="fullname"
						value={fullname}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-1 text-xs text-black/70">User Name </label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
					/>
				</div>

				<div className="mb-4">
					<label className="block mb-1 text-xs text-black/70">Email Address </label>
					<input
						type="text"
						name="email"
						value={email}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
					/>
				</div>
				<div>
					<label className="block mb-1 text-xs text-black/70">Password </label>
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
					<p className="text-xs text-center text-black/70 font-light">By creating an account, you agree to Ambition's Privacy Policy and Terms of Use.</p>
				</div>
				<button type="submit" disabled={isSubmitting} className="w-full h-10 bg-black text-white text-xs uppercase tracking-wide font-medium rounded-[3px]">
					{isSubmitting ? 'Loading' : 'Register'}
				</button>
			</form>
		</div>
	);
};

export default Register;
