import React, { useState } from 'react';
import axios from 'axios';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [data, setData] = useState({ email: '', password: '', error: null, success: null });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });
		try {
			const res = await axios.post('/api/login', { email: data.email, password: data.password });
			if (res.data.success) {
				setTimeout(() => {
					window.location.href = '/';
					localStorage.setItem('auth', JSON.stringify(res.data));
				}, 1500);
				setData({ ...data, error: null, success: res.data.success, loading: false });
			} else {
				setData({ ...data, error: res.data.error, success: null, loading: false });
				setTimeout(() => setData({ ...data, error: null, success: null, loading: false }), 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="px-12 space-y-4" onSubmit={handleSubmit}>
			{data.error && (
				<div className={`px-2 h-10 flex items-center bg-red-100 text-red-500 rounded-sm`}>
					<p className="text-sm">{data.error}</p>
				</div>
			)}
			{data.success && (
				<div className={`px-2 h-10 flex items-center bg-green-100 text-green-500 rounded-sm`}>
					<p className="text-sm">{data.success}</p>
				</div>
			)}
			<div>
				<label htmlFor="email" className="mb-1 block text-sm">
					Email address *
				</label>
				<input
					type="text"
					name="email"
					value={data.email}
					onChange={handleChange}
					placeholder="Please enter your email address"
					className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label htmlFor="password" className="mb-1 block text-sm">
					Password *
				</label>
				<div className="relative">
					<input
						type={showPass ? 'text' : 'password'}
						name="password"
						value={data.password}
						onChange={handleChange}
						placeholder="Please enter your password"
						className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
					<span
						onClick={() => setShowPass(!showPass)}
						className="text-black/30 hover:text-black absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none"
					>
						{showPass ? <IoEyeOffSharp /> : <IoEyeSharp />}
					</span>
				</div>
			</div>

			<div>
				<p className="p-4 text-center text-black/40 text-xs font-light">
					By logging in, you agree to Flex's Privacy Policy and Terms of Use.
				</p>
			</div>

			<button type="submit" className="w-full h-10 text-white bg-black text-sm uppercase font-medium rounded-sm">
				{data.loading ? 'Loading' : 'Login'}
			</button>
		</form>
	);
};

export default Login;
