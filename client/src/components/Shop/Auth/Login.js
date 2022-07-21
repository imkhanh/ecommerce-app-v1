import React, { useEffect, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth } from './Auth';

const LoginSection = () => {
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({ email: '', password: '', success: '', error: '' });
	const { email, password } = userData;

	useEffect(() => {
		window.document.title = 'Login';
	}, []);

	useEffect(() => {
		if (isAuth()) navigate('/');
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('/api/login', { email, password });
			localStorage.setItem('jwt', JSON.stringify(res.data));
			window.location.href = '/';
		} catch (error) {
			setUserData({ ...userData, email: '', password: '', success: '', error: error.response.data.msg });
			setTimeout(() => setUserData({ ...userData, mail: '', password: '', success: '', error: '' }), 2000);
		}
	};

	return (
		<div className="py-12 max-w-md mx-auto w-full space-y-12">
			<div className="flex items-center text-xs font-light text-black/70 space-x-1">
				<Link to="/" className="text-black font-normal">
					Home
				</Link>
				<span>|</span>
				<Link to="/login">Login</Link>
			</div>
			<div>
				<div className="mb-4 space-y-2">
					<span className="text-lg font-semibold tracking-widest">Returning Customers</span>
					<h1 className="text-sm text-black/70">If you are a registered user, please enter your email and password.</h1>
				</div>
				{userData.error && (
					<div className="px-2 h-10 flex items-center border-l-2 border-red-500 bg-red-100 text-red-500">
						<p className="text-sm">{userData.error}</p>
					</div>
				)}
				<form onSubmit={handleSubmit} className="py-6">
					<div className="mb-4">
						<label className="block mb-1 text-sm text-black/70">Email Address (*)</label>
						<div className="relative">
							<input type="text" name="email" value={email} onChange={handleChange} className="px-2 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
						</div>
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
						Login
					</button>
				</form>
				<div className="border-y border-gray-200 p-4 text-center font-light text-black/90 text-xs">
					Do you have an account?
					<Link to="/register" className="ml-1 text-black font-medium hover:underline cursor-pointer select-none">
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};

const Login = () => {
	return <Layout children={<LoginSection />} />;
};

export default Login;
