import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { register } from './FetchApi';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [data, setData] = useState({
		fullName: '',
		userName: '',
		email: '',
		password: '',
		error: false,
		success: false,
		loading: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });

		try {
			const res = await register({
				fullName: data.fullName,
				userName: data.userName,
				email: data.email,
				password: data.password,
			});
			if (res && res.data.success) {
				setData({
					...data,
					fullName: '',
					userName: '',
					email: '',
					password: '',
					error: false,
					success: res.data.success,
					loading: false,
				});
			} else {
				setData({ ...data, error: res.data.error, success: false, loading: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, error: false, success: false, loading: false });
		}, 2000);
	}

	return (
		<>
			{data.success && (
				<div className="mb-4 pl-2 h-10 flex items-center border-l-2 border-green-700 bg-green-100 text-green-700">
					<p className="text-xs font-medium">{data.success}</p>
				</div>
			)}
			{data.error && (
				<div className="mb-4 pl-2 h-10 flex items-center border-l-2 border-red-700 bg-red-100 text-red-700">
					<p className="text-xs font-medium">{data.error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4 space-y-1">
					<span className="text-sm text-black">Full name</span>
					<input
						type="text"
						name="fullName"
						id="fullName"
						value={data.fullName}
						onChange={(e) => setData({ ...data, success: false, error: false, fullName: e.target.value })}
						placeholder="Please enter your full name"
						className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs focus:border-black rounded-sm`}
					/>
				</div>

				<div className="mb-4 space-y-1">
					<span className="text-sm text-black">User name</span>
					<input
						type="text"
						name="userName"
						id="userName"
						value={data.userName}
						onChange={(e) => setData({ ...data, success: false, error: false, userName: e.target.value })}
						placeholder="Please enter your user name"
						className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs  focus:border-black rounded-sm `}
					/>
				</div>

				<div className="mb-4 space-y-1">
					<span className="text-sm text-black">Email address</span>
					<input
						type="text"
						name="email"
						id="email"
						value={data.email}
						onChange={(e) => setData({ ...data, success: false, error: false, email: e.target.value })}
						placeholder="Please enter your email address"
						className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs  focus:border-black rounded-sm `}
					/>
				</div>

				<div className="mb-4 space-y-1">
					<span className="text-sm text-black">Password</span>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							id="password"
							value={data.password}
							onChange={(e) => setData({ ...data, success: false, error: false, password: e.target.value })}
							placeholder="Please enter your password"
							className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs  focus:border-black rounded-sm `}
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer select-none text-sm text-black/50 hover:text-black"
						>
							{showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
						</span>
					</div>
				</div>
				<div className="mb-4 space-y-1">
					<p className="py-2 px-4 text-xs font-normal text-black/30 text-center">
						By createing an account, you agree to Nike's Privacy Policy and Terms of Use.
					</p>
				</div>
				<div>
					<button
						type="submit"
						className="w-full h-10 text-xs uppercase font-semibold bg-black text-white border border-black rounded-sm"
					>
						Register
					</button>
				</div>
			</form>
		</>
	);
};

export default Register;
