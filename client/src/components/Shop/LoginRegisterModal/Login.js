import React from 'react';

const Login = () => {
	return (
		<div className="py-4 px-12">
			<div className="mb-8 space-y-4">
				<h4 className="text-center text-base font-black uppercase">Ambition</h4>
				<p className="text-center text-xl uppercase font-medium">
					Your account <br /> for everything shop
				</p>
			</div>
			<form>
				<div className="mb-4 space-y-1">
					<label htmlFor="email" className="text-sm text-black/80 font-medium">
						Email Address
					</label>
					<input type="text" name="email" className="px-2 w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none" />
				</div>
				<div className="mb-4 space-y-1">
					<label htmlFor="password" className="text-sm text-black/80 font-medium">
						Password
					</label>
					<input type="password" name="password" className="px-2 w-full h-10 border border-gray-200 rounded-sm bg-white focus:border-black outline-none" />
				</div>
				<button type="submit" className="w-full h-10 text-xs uppercase font-medium tracking-wider text-white bg-black rounded-sm">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
