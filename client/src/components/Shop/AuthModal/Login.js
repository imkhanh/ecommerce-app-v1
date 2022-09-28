import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { login } from './FetchApi';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });
		try {
			const res = await login({ email: data.email, password: data.password });
			if (res && res.data.success) {
				localStorage.setItem('auth', JSON.stringify(res.data));
				window.location.href = '/';
				setData({ ...data, loading: false });
			} else {
				setData({ ...data, error: res.data.error, loading: false });

				setTimeout(() => {
					setData({ ...data, error: false, loading: false });
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{data.error && (
				<div className="mb-4 pl-2 h-10 flex items-center border-l-2 border-red-700 bg-red-100 text-red-700">
					<p className="text-xs font-medium">{data.error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">Email address</span>
					<input
						type="text"
						name="email"
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value, error: false })}
						placeholder="Please enter your email address"
						className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs  focus:border-black rounded-sm"
					/>
				</div>
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">Password</span>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={data.password}
							onChange={(e) => setData({ ...data, password: e.target.value, error: false })}
							placeholder="Please enter your password"
							className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs  focus:border-black rounded-sm"
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer select-none text-sm text-black/50 hover:text-black"
						>
							{showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
						</span>
					</div>
				</div>
				<div className="mb-4">
					<p className="py-2 px-4 text-xs font-normal text-black/30 text-center">
						By login in, you agree to Nike's Privacy Policy and Terms of Use.
					</p>
				</div>
				<div>
					<button
						type="submit"
						className="w-full h-10 text-xs uppercase font-semibold bg-black text-white border border-black rounded-sm"
					>
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default Login;
