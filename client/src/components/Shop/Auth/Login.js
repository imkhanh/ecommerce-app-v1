import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '', error: null });
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('/api/login', { email: formData.email, password: formData.password });
			if (res.data && res.data.token) {
				localStorage.setItem('jwt', JSON.stringify(res.data));
				window.location.href = '/';
			}
		} catch (error) {
			setFormData({ ...formData, email: '', password: '', error: error.response.data.msg });
			setTimeout(() => setFormData({ ...formData, email: '', password: '', error: null }), 2000);
		}
	};

	return (
		<>
			{formData.error && (
				<div className="h-10 px-2 flex items-center text-sm bg-red-50 text-red-500 border-l-2 border-red-500">
					<p>{formData.error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
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
					Login
				</button>
			</form>
		</>
	);
};

export default Login;
