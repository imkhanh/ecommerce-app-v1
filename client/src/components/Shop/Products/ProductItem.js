import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
	return (
		<aside className="bg-white">
			<figure>
				<Link to={`/product/detail/${product._id}`}>
					<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="h-[400px] lg:h-full w-full object-cover" />
				</Link>
			</figure>
			<div className="pt-4 md:text-sm">
				<Link to={`/product/detail/`} className="font-medium">
					{product.name}
				</Link>
				<p className="mb-2 text-black/50">{product.category.name}</p>
				<p>${product.price}</p>
			</div>
		</aside>
	);
};

export default ProductItem;
