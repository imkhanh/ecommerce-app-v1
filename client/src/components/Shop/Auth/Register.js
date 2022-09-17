import React, { useState } from 'react';
import axios from 'axios';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [data, setData] = useState({ fullName: '', userName: '', email: '', password: '', error: null, success: null, loading: false });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });
		try {
			const res = await axios.post('/api/register', {
				fullName: data.fullName,
				userName: data.userName,
				email: data.email,
				password: data.password,
			});
			if (res.data.success) {
				setData({
					...data,
					fullName: '',
					userName: '',
					email: '',
					password: '',
					error: null,
					success: res.data.success,
					loading: false,
				});
				setTimeout(() => setData({ ...data, fullName: '', userName: '', email: '', password: '', error: null, success: null, loading: false }), 2000);
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
				<label htmlFor="fullName" className="mb-2 block text-xs font-light">
					Full name *
				</label>
				<input
					type="text"
					name="fullName"
					value={data.fullName}
					onChange={handleChange}
					placeholder="Please enter your full name"
					className="px-2 text-xs w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label htmlFor="userName" className="mb-2 block text-xs font-light">
					User name *
				</label>
				<input
					type="text"
					name="userName"
					value={data.userName}
					onChange={handleChange}
					placeholder="Please enter your user name"
					className="px-2 text-xs w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label htmlFor="email" className="mb-2 block text-xs font-light">
					Email address *
				</label>
				<input
					type="text"
					name="email"
					value={data.email}
					onChange={handleChange}
					placeholder="Please enter your email address"
					className="px-2 text-xs w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label htmlFor="password" className="mb-2 block text-xs font-light">
					Password *
				</label>
				<div className="relative">
					<input
						type={showPass ? 'text' : 'password'}
						name="password"
						value={data.password}
						onChange={handleChange}
						placeholder="Please enter your password"
						className="px-2 text-xs w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
					/>
					<span
						onClick={() => setShowPass(!showPass)}
						className="text-sm text-black/30 hover:text-black absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none"
					>
						{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
					</span>
				</div>
			</div>
			<div>
				<p className="p-4 text-center text-black/40 text-xs font-light">By creating an account, you agree to Flex's Privacy Policy and Terms of Use.</p>
			</div>
			<button type="submit" className="w-full h-10 text-white bg-black text-sm uppercase font-medium rounded-sm">
				{data.loading ? 'Loading' : 'Register'}
			</button>
		</form>
	);
};

export default Register;