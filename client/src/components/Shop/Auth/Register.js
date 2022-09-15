import React, { useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

const Register = () => {
	const [types, setTypes] = useState({
		showPass: false,
		showConfirmPass: false,
	});
	const handleSubmit = async (e) => {};

	return (
		<form className="px-12 space-y-4" onSubmit={handleSubmit}>
			<div>
				<label className="mb-1 block text-sm">Full name *</label>
				<input
					type="text"
					name="fullName"
					placeholder="Please enter your full name"
					className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
				/>
			</div>
			<div>
				<label className="mb-1 block text-sm">User name *</label>
				<input
					type="text"
					name="userName"
					placeholder="Please enter your user name"
					className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
				/>
			</div>
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
						type={types.showPass ? 'text' : 'password'}
						name="password"
						placeholder="Please enter your password"
						className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
					<span
						onClick={() => setTypes({ ...types, showPass: !types.showPass })}
						className="text-black/50 hover:text-black absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none"
					>
						{types.showPass ? <IoEyeOffSharp /> : <IoEyeSharp />}
					</span>
				</div>
			</div>
			<div>
				<label className="mb-1 block text-sm">Confirm Password *</label>
				<div className="relative">
					<input
						type={types.showConfirmPass ? 'text' : 'password'}
						name="confirmPassword"
						placeholder="Please enter your confirm password"
						className="px-2 text-sm w-full h-10 bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
					<span
						onClick={() => setTypes({ ...types, showConfirmPass: !types.showConfirmPass })}
						className="text-black/50 hover:text-black absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none"
					>
						{types.showConfirmPass ? <IoEyeOffSharp /> : <IoEyeSharp />}
					</span>
				</div>
			</div>

			<div>
				<p className="p-4 text-center text-black/40 text-xs font-light">
					By creating an account, you agree to shop's Privacy Policy and Terms of Use.
				</p>
			</div>

			<button type="submit" className="w-full h-10 text-white bg-black text-sm uppercase font-medium rounded-sm">
				Login
			</button>
		</form>
	);
};

export default Register;
