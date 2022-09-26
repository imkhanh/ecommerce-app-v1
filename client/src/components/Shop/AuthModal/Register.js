import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [data, setData] = useState({
		fullName: '',
		userName: '',
		email: '',
		password: '',
		error: '',
		loading: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">Full name</span>
					<input
						type="text"
						name="fullName"
						value={data.fullName}
						onChange={handleChange}
						placeholder="Please enter your full name"
						className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-sm  focus-within:border-black rounded-sm duration-200 ease-in-out"
					/>
				</div>{' '}
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">User name</span>
					<input
						type="text"
						name="userName"
						value={data.userName}
						onChange={handleChange}
						placeholder="Please enter your user name"
						className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-sm  focus-within:border-black rounded-sm duration-200 ease-in-out"
					/>
				</div>
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">Email address</span>
					<input
						type="text"
						name="email"
						value={data.email}
						onChange={handleChange}
						placeholder="Please enter your email address"
						className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-sm  focus-within:border-black rounded-sm duration-200 ease-in-out"
					/>
				</div>
				<div className="mb-4">
					<span className="mb-1 block text-sm text-black">Password</span>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={data.password}
							onChange={handleChange}
							placeholder="Please enter your password"
							className="px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-sm  focus-within:border-black rounded-sm duration-200 ease-in-out"
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
