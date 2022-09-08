import React, { useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

const RegisterForm = () => {
	const [showPass, setShowPass] = useState(false);

	return (
		<div>
			<form className="space-y-4">
				<div>
					<label className="mb-1 block text-sm text-black/70">Full name</label>
					<input type="text" name="fullname" className="px-2 w-full h-10 text-sm text-black border border-black/10 focus:border-black outline-none rounded-sm transition-colors" />
				</div>
				<div>
					<label className="mb-1 block text-sm text-black/70">User name</label>
					<input type="text" name="username" className="px-2 w-full h-10 text-sm text-black border border-black/10 focus:border-black outline-none rounded-sm transition-colors" />
				</div>
				<div>
					<label className="mb-1 block text-sm text-black/70">Email address</label>
					<input type="text" name="email" className="px-2 w-full h-10 text-sm text-black border border-black/10 focus:border-black outline-none rounded-sm transition-colors" />
				</div>
				<div>
					<label className="mb-1 block text-sm text-black/70">Password</label>
					<div className="relative">
						<input
							type={showPass ? 'text' : 'password'}
							name="email"
							className="px-2 w-full h-10 text-sm text-black border border-black/10 focus:border-black outline-none rounded-sm transition-colors"
						/>
						<span
							onClick={() => setShowPass(!showPass)}
							className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black transition-colors"
						>
							{showPass ? <IoEyeOffSharp /> : <IoEyeSharp />}
						</span>
					</div>
				</div>
				<button type="submit" className="w-full h-10 text-sm uppercase text-white bg-black rounded-sm">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
