import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Layout from '../Layout/Layout';
import axios from 'axios';

const RegisterSection = () => {
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({ email: '', password: '', fullname: '', username: '', success: '', error: '' });
	const { email, password, fullname, username } = userData;

	useEffect(() => {
		window.document.title = 'Register';
	}, []);

	const alert = (type, msg) => {
		return (
			<div className={`px-2 h-10 flex items-center border-l-2 border-${type}-500 bg-${type}-100 text-${type}-500`}>
				<p className="text-sm">{msg}</p>
			</div>
		);
	};

	if (userData.success || userData.error) {
		setTimeout(() => setUserData({ ...userData, fullname: '', username: '', email: '', password: '', success: '', error: '' }), 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/register', { email, password, fullname, username });
			setUserData({ ...userData, fullname: '', username: '', email: '', password: '', success: res.data.msg, error: '' });
		} catch (error) {
			setUserData({ ...userData, fullname: '', username: '', email: '', password: '', success: '', error: error.response.data.msg });
		}
	};

	return (
		<div className="py-12 max-w-md mx-auto w-full space-y-12">
			<div className="flex items-center text-xs font-light text-black/70 space-x-1">
				<Link to="/" className="text-black font-normal">
					Home
				</Link>
				<span>|</span>
				<Link to="/register">Registration</Link>
			</div>
			<div>
				<div className="mb-4 space-y-2">
					<span className="text-lg font-semibold tracking-widest">Registration</span>
					<h1 className="text-sm text-black/70">Become a member, your account for everything shop</h1>
				</div>
				{userData.error && alert('red', userData.error)}
				{userData.success && alert('green', userData.success)}
				<form onSubmit={handleSubmit} className="py-6">
					<div className="mb-4">
						<label className="block mb-1 text-sm text-black/70">Full Name (*)</label>
						<input type="text" name="fullname" value={fullname} onChange={handleChange} className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<div className="mb-4">
						<label className="block mb-1 text-sm text-black/70">User Name (*)</label>
						<input type="text" name="username" value={username} onChange={handleChange} className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>

					<div className="mb-4">
						<label className="block mb-1 text-sm text-black/70">Email Address (*)</label>
						<input type="text" name="email" value={email} onChange={handleChange} className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<div className="mb-4">
						<label className="block mb-1 text-sm text-black/70">Password (*)</label>
						<div className="relative">
							<input type={showPass ? 'text' : 'password'} name="password" value={password} onChange={handleChange} className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />

							<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black">
								{showPass ? <BsEyeSlashFill className="text-sm" /> : <BsEyeFill className="text-sm" />}
							</span>
						</div>
					</div>

					<button type="submit" className="w-full h-10 bg-black text-white text-sm uppercase font-medium rounded-sm">
						Register
					</button>
				</form>
				<div className="border-y border-gray-200 p-4 text-center font-light text-black/90 text-xs">
					Already an account?
					<Link to="/login" className="ml-1 text-black font-medium hover:underline cursor-pointer select-none">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

const Register = () => {
	return <Layout children={<RegisterSection />} />;
};

export default Register;
