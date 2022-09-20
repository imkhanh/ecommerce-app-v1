import React, { useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { login } from './FetchApi';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [data, setData] = useState({ email: '', password: '', error: false, loading: false });

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });
		try {
			const res = await login({ email: data.email, password: data.password });
			if (res.data.success) {
				localStorage.setItem('auth', JSON.stringify(res.data));
				window.location.href = '/';
			} else {
				setData({ ...data, email: '', password: '', error: res.data.error, loading: false });
				setTimeout(() => {
					setData({ ...data, email: '', password: '', error: false, loading: false });
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{data.error && (
				<div className="mb-4 px-2 py-[10px] text-red-500 bg-red-100">
					<p className="text-sm font-normal">{data.error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="email">
						<span className="block mb-1 text-xs font-light text-black">Email address</span>
						<input
							type="text"
							name="email"
							value={data.email}
							onChange={(e) => setData({ ...data, email: e.target.value })}
							placeholder="Please enter your email address"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="password">
						<span className="block mb-1 text-xs font-light text-black">Password</span>
						<div className="relative">
							<input
								type={showPass ? 'text' : 'password'}
								name="password"
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
								placeholder="Please enter your password"
								className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
							/>
							<div className="absolute top-1/2 right-2 -translate-y-1/2">
								<span onClick={() => setShowPass(!showPass)} className="text-xs text-black/50 hover:text-black cursor-pointer select-none">
									{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
								</span>
							</div>
						</div>
					</label>
				</div>
				<div className="mb-4">
					<p className="p-3 text-center text-xs text-black/40 font-light">
						By logging in, you agree to .K's <span className="underline underline-offset-2">Privacy Policy</span> and{' '}
						<span className="underline underline-offset-2">Terms of Use</span>.
					</p>
				</div>
				<button type="submit" className="w-full h-10 border border-black bg-black text-white text-xs uppercase rounded-sm">
					Login
				</button>
			</form>
		</>
	);
};

export default Login;
