import React, { useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const Register = () => {
	const [showPass, setShowPass] = useState(false);

	return (
		<>
			<form>
				<div className="mb-4">
					<label htmlFor="name">
						<span className="block mb-1 text-sm font-light text-black">Name</span>
						<input
							type="text"
							name="name"
							placeholder="Please enter your name"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="email">
						<span className="block mb-1 text-sm font-light text-black">Email address</span>
						<input
							type="text"
							name="email"
							placeholder="Please enter your email address"
							className="px-2 w-full h-10 border-x text-xs text-black bg-white outline-none border border-black/20 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="password">
						<span className="block mb-1 text-sm font-light text-black">Password</span>
						<div className="relative">
							<input
								type={showPass ? 'text' : 'password'}
								name="password"
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
						By creating an account, you agree to .K's <span className="underline underline-offset-1">Privacy Policy</span> and
						<span className="underline underline-offset-1"> Terms of Use</span>.
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
