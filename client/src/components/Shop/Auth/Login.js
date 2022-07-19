import React, { useState } from 'react';
import InputField from './InputField';
import axios from 'axios';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({ email: '', password: '', success: '', error: '' });
	const { email, password } = userData;

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
		<div className="px-12">
			{userData.error && (
				<div className="px-2 h-10 flex items-center border-l-2 border-red-500 bg-red-100 text-red-500">
					<p className="text-sm">{userData.error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="py-6">
				<InputField label="Email Address" type="text" name="email" value={email} onChange={handleChange} />
				<InputField label="Password" type={showPass ? 'text' : 'password'} name="password" value={password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />
				<button type="submit" className="w-full h-10 bg-black text-white text-sm rounded-sm">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
