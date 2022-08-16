import React, { useState } from 'react';

const Register = () => {
	const [formData, setFormData] = useState({ fullName: '', userName: '', email: '', password: '', error: null, success: null });
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="fullname" className="mb-1 block text-sm text-black/80 font-medium">
						Full name
					</label>
					<input
						type="text"
						name="fullname"
						value={formData.fullName}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none"
					/>
				</div>
				<div>
					<label htmlFor="username" className="mb-1 block text-sm text-black/80 font-medium">
						User name
					</label>
					<input
						type="text"
						name="username"
						value={formData.userName}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none"
					/>
				</div>
				<div>
					<label htmlFor="email" className="mb-1 block text-sm text-black/80 font-medium">
						Email Address
					</label>
					<input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none"
					/>
				</div>
				<div>
					<label htmlFor="password" className="mb-1 block text-sm text-black/80 font-medium">
						Password
					</label>
					<div className="relative">
						<input
							type={showPass ? 'text' : 'password'}
							name="password"
							value={formData.password}
							onChange={handleChange}
							autoComplete="off"
							className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none"
						/>
						<span
							onClick={() => setShowPass(!showPass)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-xs text-black/40 hover:text-black transition-colors"
						>
							{showPass ? 'hide' : 'show'}
						</span>
					</div>
				</div>
				<button type="submit" className="w-full h-10 text-xs uppercase font-medium tracking-wider text-white bg-black rounded-sm">
					Register
				</button>
			</form>
		</>
	);
};

export default Register;
