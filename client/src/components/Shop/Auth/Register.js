import React, { useState } from 'react';
import InputField from './InputField';
import axios from 'axios';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [userData, setUserData] = useState({ email: '', password: '', fullname: '', username: '', success: '', error: '' });
	const { email, password, fullname, username } = userData;

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
		<div className="px-12">
			{userData.error && alert('red', userData.error)}
			{userData.success && alert('green', userData.success)}
			<form onSubmit={handleSubmit} className="py-6">
				<InputField label="Fullname" type="text" name="fullname" value={fullname} onChange={handleChange} />
				<InputField label="Username" type="text" name="username" value={username} onChange={handleChange} />
				<InputField label="Email Address" type="text" name="email" value={email} onChange={handleChange} />
				<InputField label="Password" type={showPass ? 'text' : 'password'} name="password" value={password} onChange={handleChange} showPass={showPass} setShowPass={setShowPass} />

				<button type="submit" className="w-full h-10 bg-black text-white text-sm rounded-sm">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
