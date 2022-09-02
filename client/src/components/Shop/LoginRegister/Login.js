import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const initialState = { email: '', password: '', error: null };
const Login = () => {
	const [formData, setFormData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="px-12 pb-8">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm text-black/80">Email Address</label>
					<input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="px-2 w-full h-10 text-sm bg-transparent border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
					/>
				</div>
				<div>
					<label className="block mb-1 text-sm text-black/80">Password</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="px-2 w-full h-10 text-sm bg-transparent border border-gray-200 rounded-[3px] outline-none focus:border-black transition-colors"
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black/50 hover:text-black cursor-pointer select-none transition-colors"
						>
							{showPassword ? <BsEyeSlashFill className="text-sm" /> : <BsEyeFill className="text-sm" />}
						</span>
					</div>
				</div>
				<button type="submit" className="w-full h-10 text-sm font-medium uppercase tracking-wide bg-black text-white rounded-[3px]">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
