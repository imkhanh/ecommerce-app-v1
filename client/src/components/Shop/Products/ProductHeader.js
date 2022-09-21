import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="py-4 px-8 md:px-4 border-t-0 border-b border-black/10 flex items-center justify-between">
				<div className="flex items-center text-sm space-x-2 text-black/50">
					<p onClick={() => navigate('/')} className="cursor-pointer">
						Home
					</p>
					<span>/</span>
					<p onClick={() => navigate('/shop')} className="cursor-pointer">
						Shop
					</p>
					{/* {products && (
						<>
							<span>/</span>
							<p className="cursor-pointer font-medium text-black">{products ? products[0]?.category.name : ''}</p>
						</>
					)} */}
				</div>
				<div className="flex items-center space-x-8">
					<select className="w-32 cursor-pointer outline-none text-sm text-black/50 hover:text-black">
						<option>Collections</option>
						<option>All</option>
						<option>Men</option>
						<option>Women</option>
					</select>
					<select className="w-32 cursor-pointer outline-none text-sm text-black/50 hover:text-black">
						<option>Sort</option>
						<option>All</option>
						<option>Men</option>
						<option>Women</option>
					</select>
				</div>
			</div>
			<div className="hidden py-14 border-b md:flex items-center justify-center">
				<h1 className="h-full text-3xl font-semibold ">All Products</h1>
			</div>
		</>
	);
};

export default ProductHeader;
