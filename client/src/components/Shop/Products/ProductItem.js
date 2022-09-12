import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProductItem = () => {
	return (
		<aside className="relative mb-8 md:mb-4 bg-white">
			<div className="absolute top-4 right-4 z-10">
				<span className="cursor-pointer select-none">
					<BsHeart className="text-xl" />
				</span>
				<span className="cursor-pointer select-none text-red-500">
					<BsHeartFill className="text-xl" />
				</span>
			</div>
			<figure>
				<Link to="/product/detail">
					<img src="https://techland.com.vn/wp-content/uploads/2019/04/apple-magic-keyboard-w-numeric-keypad-gray-1.jpg" alt="" className="w-full h-full object-cover" />
				</Link>
			</figure>

			<div className="p-4">
				<Link to="/product/detail" className="font-medium">
					Product 1
				</Link>
				<p className="mt-2 mb-1">Nike</p>
				<p>$ 200</p>
			</div>
		</aside>
	);
};

export default ProductItem;
