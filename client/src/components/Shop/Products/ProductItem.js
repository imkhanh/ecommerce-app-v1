import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { isWish, addToWishList, removeWishList } from './Functions';

const ProductItem = ({ product }) => {
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));

	return (
		<div className="relative mb-8 bg-white z-0">
			<div className="absolute top-4 right-4 z-20">
				<span
					className={`${isWish(product._id, wishList) ? 'hidden' : ''} text-black text-[18px] cursor-pointer select-none`}
					onClick={() => addToWishList(product._id, setWishList)}
				>
					<BsHeart />
				</span>
				<span
					className={`${!isWish(product._id, wishList) ? 'hidden' : ''} text-blue-500 text-[18px] cursor-pointer select-none`}
					onClick={() => removeWishList(product._id, setWishList)}
				>
					<BsHeartFill />
				</span>
			</div>
			<figure>
				<Link to={`/shop/detail/${product._id}`}>
					<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-full object-cover" />
				</Link>
			</figure>
			<div className="pt-4">
				<div className="flex items-center justify-between">
					<Link to={`/shop/detail/${product._id}`} className="text-sm uppercase font-bold truncate">
						{product.name}
					</Link>
					<div className="flex-shrink text-sm text-black/50">({product.ratingReviews.length})</div>
				</div>
				<p className="mt-1 text-black/50">{product.category.name}</p>
				<p className="mt-2 text-base">${product.price}</p>
			</div>
		</div>
	);
};

export default ProductItem;
