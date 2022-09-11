import React from 'react';
import ProductHeader from './ProductHeader';
import ProductItem from './ProductItem';

const ProductSection = () => {
	return (
		<section className="max-w-7xl mx-auto w-full flex flex-col px-8 md:px-4 py-12 md:py-8 space-y-8">
			<div className="mb-14 lg:mb-7 relative">
				<h1 className="text-2xl lg:text-xl text-center text-black font-medium tracking-widest">All Product</h1>
				<p className="absolute -bottom-14 lg:-bottom-7 left-1/2 transform -translate-x-1/2 w-[1px] h-14 lg:h-7 bg-black/50"></p>
			</div>
			<ProductHeader />
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
			</div>
		</section>
	);
};

export default ProductSection;
