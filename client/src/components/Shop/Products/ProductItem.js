import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { isWish, addWish, removeWish } from './Actions';
import { isAuth } from '../Auth/Auth';

const ProductItem = ({ product }) => {
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('lists')));

	return (
		<aside key={product._id} className="relative bg-white">
			<div className="absolute top-4 right-4 z-10">
				{!isAuth() ? (
					<span className="select-none cursor-pointer">
						<BsHeart className="text-xl" />
					</span>
				) : (
					<>
						<span onClick={() => addWish(product._id, setWishList)} className={`${isWish(product._id, wishList) ? 'hidden' : ''} select-none cursor-pointer`}>
							<BsHeart className="text-xl" />
						</span>
						<span onClick={() => removeWish(product._id, setWishList)} className={`${!isWish(product._id, wishList) ? 'hidden' : ''} select-none cursor-pointer`}>
							<BsHeartFill className="text-xl text-blue-500" />
						</span>
					</>
				)}
			</div>
			<figure>
				<Link to={`/product/detail/${product._id}`}>
					<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="h-full w-full object-cover" />
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
