import React, { useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const handleSubmit = async (e) => {};

	return (
		<form className="px-12 space-y-4" onSubmit={handleSubmit}>
			<div>
				<label className="mb-1 block text-sm">Email address *</label>
				<input
					type="text"
					name="email"
					placeholder="Please enter your email address"
					className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label className="mb-1 block text-sm">Password *</label>
				<div className="relative">
					<input
						type={showPass ? 'text' : 'password'}
						name="email"
						placeholder="Please enter your password"
						className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
					<span
						onClick={() => setShowPass(!showPass)}
						className="text-black/50 hover:text-black absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none"
					>
						{showPass ? <IoEyeOffSharp /> : <IoEyeSharp />}
					</span>
				</div>
			</div>

			<div>
				<p className="p-4 text-center text-black/40 text-xs font-light">
					By logging in, you agree to shop's Privacy Policy and Terms of Use.
				</p>
			</div>

			<button type="submit" className="w-full h-10 text-white bg-black text-sm uppercase font-medium rounded-sm">
				Login
			</button>
		</form>
	);
};

export default Login;
