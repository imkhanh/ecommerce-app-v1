import React from 'react';
import ProductFilter from './ProductFilter';

const ProductSection = () => {
	return (
		<section>
			<ProductFilter />
			<div className="h-[2000px]">Products</div>
		</section>
	);
};

export default ProductSection;
