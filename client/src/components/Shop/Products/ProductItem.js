import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';

const ProductItem = ({ product }) => {
	const navigate = useNavigate();

	const statusButtonStyle = `absolute top-6 right-6 text-xs py-[6px] px-4 rounded-full cursor-pointer uppercase font-semibold`;

	return (
		<div className="p-6 relative bg-white select-none border-b border-r border-black/10">
			{product.status && (
				<button
					className={`${statusButtonStyle} ${
						product.status === 'New' || product.status === 'Pre Order'
							? 'bg-white text-black border border-gray-200'
							: product.status === 'Sale'
							? 'bg-yellow-50 text-yellow-900 border border-yellow-50'
							: product.status === 'Sold Out' && 'bg-gray-200 text-gray-600 border border-gray-200'
					}`}
				>
					{product.status}
				</button>
			)}
			<div className="overflow-hidden">
				<img
					alt={product.name}
					src={`http://localhost:3000/uploads/products/${product.images[0]}`}
					onClick={() => navigate(`/shop/product-detail/${product._id}`)}
					onMouseEnter={(e) => (e.currentTarget.src = `http://localhost:3000/uploads/products/${product.images[1]}`)}
					onMouseLeave={(e) => (e.currentTarget.src = `http://localhost:3000/uploads/products/${product.images[0]}`)}
					className="w-full h-[280px] md:h-full object-cover duration-200 ease-in-out cursor-pointer"
				/>
			</div>
			<div className="pt-3 flex items-center justify-between">
				<div>
					<h1 onClick={() => navigate(`/shop/product-detail/${product._id}`)} className="font-bold cursor-pointer">
						{product.name}
					</h1>
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
