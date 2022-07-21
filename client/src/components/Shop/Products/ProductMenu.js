import React from 'react';
import { BsSearch } from 'react-icons/bs';

const ProductMenu = () => {
	return (
		<div className="py-6 grid grid-cols-12 items-center bg-white z-10">
			<div className="col-span-6 lg:hidden">
				<p className="text-sm">6 products</p>
			</div>
			<div className="col-span-6 lg:col-span-12 flex items-center space-x-4">
				<div className="w-full relative">
					<span className="absolute top-1/2 left-0 transform -translate-y-1/2">
						<BsSearch className="text-gray-500" />
					</span>
					<input type="text" placeholder="Search" className="h-8 pl-6 w-full text-sm border-b border-black outline-none" />
				</div>
				<select className="h-8 w-full text-sm border-b border-black outline-none">
					<option>Categories</option>
					<option>1</option>
					<option>2</option>
				</select>
				<select className="h-8 w-full text-sm border-b border-black outline-none">
					<option>Sort by</option>
					<option>1</option>
					<option>2</option>
				</select>
			</div>
		</div>
	);
};

export default ProductMenu;
