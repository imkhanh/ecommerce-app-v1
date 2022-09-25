import React, { useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [data, setData] = useState({ fullName: '', userName: '', email: '', password: '', error: '', success: '', loading: false });

	// if (data.error || data.success) {
	// 	setTimeout(() => {
	// 		setData({ ...data, fullName: '', userName: '', email: '', password: '', error: '', success: '', loading: false });
	// 	}, 2000);
	// }

	const alert = (msg, type) => (
		<div className={`mb-4 px-2 py-[10px] text-${type}-500 bg-${type}-100 rounded-sm`}>
			<p className="text-xs font-normal">{msg}</p>
		</div>
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setData({ ...data, loading: true });
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{data.error && alert(data.msg, 'red')}
			{data.success && alert(data.msg, 'green')}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="fullName">
						<span className="block mb-1 text-xs font-light text-black">Full Name</span>
						<input
							type="text"
							name="fullName"
							value={data.fullName}
							onChange={handleChange}
							placeholder="Please enter your full name"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="userName">
						<span className="block mb-1 text-xs font-light text-black">User Name</span>
						<input
							type="text"
							name="userName"
							value={data.userName}
							onChange={handleChange}
							placeholder="Please enter your user name"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="email">
						<span className="block mb-1 text-xs font-light text-black">Email address</span>
						<input
							type="text"
							name="email"
							value={data.email}
							onChange={handleChange}
							placeholder="Please enter your email address"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="password">
						<span className="block mb-1 text-xs font-light text-black">Password</span>
						<div className="relative">
							<input
								type={showPass ? 'text' : 'password'}
								name="password"
								value={data.password}
								onChange={handleChange}
								placeholder="Please enter your password"
								className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
							/>
							<div className="absolute top-1/2 right-2 -translate-y-1/2">
								<span onClick={() => setShowPass(!showPass)} className="text-xs text-black/50 hover:text-black cursor-pointer select-none">
									{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
								</span>
							</div>
						</div>
					</label>
				</div>
				<div className="mb-4">
					<p className="p-3 text-center text-xs text-black/40 font-light">
						By creating an account, you agree to Blancos's <span className="underline underline-offset-2">Privacy Policy</span> and
						<span className="underline underline-offset-2"> Terms of Use</span>.
					</p>
				</div>
				<button type="submit" className="w-full h-10 border border-black bg-black text-white text-xs uppercase rounded-sm">
					Register
				</button>
			</form>
		</>
	);
};

export default Register;
