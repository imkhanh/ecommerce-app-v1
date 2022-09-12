import React from 'react';
import ProductMenu from './ProductMenu';
import ProductItem from './ProductItem';

const ProductSection = () => {
	return (
		<section className="pt-24 lg:pt-20 md:pt-16 px-8 md:px-4 max-w-7xl mx-auto w-full h-full">
			<ProductMenu />
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 duration-200 ease-in-out">
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
