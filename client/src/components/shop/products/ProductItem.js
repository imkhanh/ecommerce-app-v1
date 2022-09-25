import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsHandbag, BsHeart } from 'react-icons/bs';

const ProductItem = ({ product }) => {
	const navigate = useNavigate();

	const handleAddToWish = (product) => {
		console.log(product);
	};
	const handleAddToCart = (product) => {
		console.log(product);
	};

	return (
		<div className="relative flex flex-col w-full h-full bg-white select-none border-r border-b border-black/10">
			<div className="absolute top-6 left-8 z-10">
				<span onClick={() => handleAddToWish(product)} className="cursor-pointer select-none text-xl lg:text-lg">
					<BsHeart />
				</span>
			</div>
			{product.status && (
				<div
					className={`absolute top-6 right-8 text-xs py-[6px] px-4 sm:text-xs rounded-full cursor-pointer uppercase font-semibold z-10 ${
						product.status === 'New' || product.status === 'Pre Order'
							? 'bg-white text-black border border-gray-200'
							: product.status === 'Sale'
							? 'bg-[#F6EFE2] text-[#8c6707] border border-[#F6EFE2]'
							: product.status === 'Sold Out' && 'bg-gray-200 text-gray-600 border border-gray-200'
					}`}
				>
					{product.status}
				</div>
			)}
			<div className="flex-1 overflow-hidden">
				<img
					alt={product.name}
					onClick={() => navigate(`/shop/product-detail/${product._id}`)}
					src={`http://localhost:3000/uploads/products/${product.images[0]}`}
					className="w-full h-[280px] lg:h-full hover:scale-110 object-contain duration-300 ease-linear cursor-pointer"
				/>
			</div>
			<div className="py-4 px-8 flex items-start justify-between">
				<div>
					<h1 onClick={() => navigate(`/shop/product-detail/${product._id}`)} className="text-base sm:text-xs font-medium cursor-pointer">
						{product.name}
					</h1>
					<p className="text-sm">${product.price}.00</p>
				</div>
				<div>
					<button onClick={() => handleAddToCart(product)} className="cursor-pointer text-xl lg:text-lg sm:text-base">
						<BsHandbag />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
