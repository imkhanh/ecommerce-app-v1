import React from 'react';

const ProductMenu = () => {
	return (
		<div className="grid grid-cols-12 items-center bg-white border-b border-black z-10">
			<div className="col-span-6 lg:hidden">
				<p className="text-sm">6 products</p>
			</div>
			<div className="col-span-6 lg:col-span-12 flex items-center space-x-4">
				<select className="h-8 w-full text-sm border-b border-white outline-none">
					<option>Categories</option>
					<option>All</option>
					<option>2</option>
				</select>
				<select className="h-8 w-full text-sm border-b border-white outline-none">
					<option>Sort by</option>
					<option>1</option>
					<option>2</option>
				</select>
			</div>
		</div>
	);
};

export default ProductMenu;
