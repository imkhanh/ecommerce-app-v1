import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { isWish, addToWish, removeToWish } from './Functions';

const ProductItem = ({ product }) => {
	const navigate = useNavigate();
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));

	return (
		<div className="p-6 relative bg-white select-none border-r border-b border-black/10">
			{product.status && (
				<button
					className={`absolute top-6 right-6 text-xs py-[6px] px-4 rounded-full cursor-pointer uppercase font-semibold ${
						product.status === 'New' || product.status === 'Pre Order'
							? 'bg-white text-black border border-gray-200'
							: product.status === 'Sale'
							? 'bg-[#F6EFE2] text-[#8c6707] border border-[#F6EFE2]'
							: product.status === 'Sold Out' && 'bg-gray-200 text-gray-600 border border-gray-200'
					}`}
				>
					{product.status}
				</button>
			)}
			<div className="overflow-hidden">
				<img
					alt={product.name}
					onClick={() => navigate(`/shop/product-detail/${product._id}`)}
					src={`http://localhost:3000/uploads/products/${product.images[0]}`}
					onMouseEnter={(e) => (e.currentTarget.src = `http://localhost:3000/uploads/products/${product.images[1]}` || '')}
					onMouseLeave={(e) => (e.currentTarget.src = `http://localhost:3000/uploads/products/${product.images[0]}`)}
					className="w-full h-[280px] lg:h-full object-contain duration-200 ease-in-out cursor-pointer"
				/>
			</div>
			<div className="pt-3 flex items-center justify-between">
				<div>
					<h1 onClick={() => navigate(`/shop/product-detail/${product._id}`)} className="font-bold cursor-pointer">
						{product.name}
					</h1>
					<p className="text-sm">${product.price}.00</p>
				</div>
				<div>
					<span onClick={() => addToWish(product._id, setWishList)} className={`${isWish(product._id, wishList) ? 'hidden' : ''} cursor-pointer text-xl`}>
						<BsHeart />
					</span>
					<span
						onClick={() => removeToWish(product._id, setWishList)}
						className={`${!isWish(product._id, wishList) ? 'hidden' : ''} text-red-500 cursor-pointer text-xl`}
					>
						<BsHeartFill />
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
