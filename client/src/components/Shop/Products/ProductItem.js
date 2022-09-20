import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';

const ProductItem = ({ product }) => {
	return (
		<div className="p-6 relative bg-white select-none product-item">
			<div className="overflow-hidden">
				<img
					alt={product.name}
					src={`http://localhost:3000/uploads/products/${product.images[0]}`}
					className="w-full h-[280px] md:h-full object-cover duration-200 ease-in-out"
				/>
			</div>
			<div className="pt-3 flex items-center justify-between">
				<div>
					<Link to={`/shop/product-detail/${product._id}`} className="font-bold">
						{product.name}
					</Link>
					<p className="text-sm">${product.price}</p>
				</div>
				<div>
					<span className="cursor-pointer text-xl">
						<BsHeart />
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
