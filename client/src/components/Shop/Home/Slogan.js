import React from 'react';
import { useNavigate } from 'react-router-dom';

const Slogan = () => {
	const navigate = useNavigate();

	return (
		<div className="py-12 flex flex-col items-center justify-center space-y-4">
			<div className="text-center">
				<p className="font-semibold">Just in: Fast Pack</p>
				<h1 className="uppercase font-extrabold text-5xl md:text-4xl">Find Your Fast</h1>
			</div>
			<p>So many to flys. Choose yours</p>
			<div
				onClick={() => navigate('/shop')}
				className="py-2 px-4 bg-black text-white text-sm rounded-full cursor-pointer select-none"
			>
				Shop All
			</div>
		</div>
	);
};

export default Slogan;
