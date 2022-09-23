import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateQuantity, addToCart } from './Functions';
import { isWish, addToWish, removeToWish } from '../Products/Functions';
import { BsArrowLeft, BsHeartFill } from 'react-icons/bs';

const SingleProductInfo = ({ product, inCart, dispatch, fetchAllProducts }) => {
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));
	const [qty, setQty] = useState(1);
	const [alert, setAlert] = useState(false);
	const [readMore, setReadMore] = useState(false);

	return (
		<div className="p-20 xl:p-16 lg:p-8 md:px-4 md:py-8 w-1/2 md:w-full h-full sticky top-14 bg-white space-y-8 z-10 duration-200 ease-in-out">
			<div className="flex flex-col space-y-6 md:space-y-2">
				<Link to="/shop" className="md:hidden italic text-black/50 hover:text-black flex items-center underline underline-offset-4">
					<BsArrowLeft />
					<span className="ml-2 text-sm">Back to shop</span>
				</Link>
				<div className="flex items-center justify-between">
					<h1 className="text-4xl lg:text-3xl md:text-2xl font-bold">{product.name}</h1>
					{product.status && (
						<button
							className={`text-xs py-[6px] px-4 rounded-full cursor-pointer uppercase font-semibold ${
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
				</div>
				<p className="text-black text-lg">{product.category.name}</p>
				<p className="text-black text-2xl lg:text-xl md:text-lg font-semibold">${product.price}.00</p>
			</div>
			<div>
				<p className="text-base sm:text-sm text-black font-medium text-justify">
					{product.description.length < 435 ? product.description : readMore ? product.description + ' ' : product.description.slice(0, 435) + '...'}
					{product.description.length > 420 && (
						<span
							onClick={() => setReadMore(!readMore)}
							className="font-light italic text-gray-500 hover:text-black hover:underline underline-offset-2 cursor-pointer"
						>
							{readMore ? 'hide' : 'read more'}
						</span>
					)}
				</p>
			</div>
			<div>
				<span className="block mb-2 text-base sm:text-sm font-medium">Quantity: {product.quantity}</span>
				<div className="flex items-center select-none">
					<span
						onClick={() => updateQuantity('decrease', qty, setQty, product.quantity, setAlert)}
						className="w-8 h-8 rounded-md flex items-center justify-center border border-black/20 hover:border-black cursor-pointer duration-200 ease-in-out"
					>
						-
					</span>
					<span className="w-12 text-center text-base sm:text-sm">{qty}</span>
					<span
						onClick={() => updateQuantity('increase', qty, setQty, product.quantity, setAlert)}
						className="w-8 h-8 rounded-md flex items-center justify-center border border-black/10 hover:border-black cursor-pointer duration-200 ease-in-out"
					>
						+
					</span>
				</div>
				{alert && (
					<div className="mt-4 px-4 py-6 flex items-center justify-between bg-gray-50">
						<p className="text-gray-400 text-base sm:text-sm">Stock limited</p>
						<span onClick={() => setAlert(false)} className=" text-base sm:text-sm text-gray-400 hover:text-black cursor-pointer">
							close
						</span>
					</div>
				)}
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-1 md:grid-cols-2 gap-3">
				{product.quantity !== 0 ? (
					inCart && inCart.includes(product._id) ? (
						<button className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-full">In Cart</button>
					) : (
						<button
							onClick={() => addToCart(product._id, qty, product.price, setQty, dispatch, fetchAllProducts)}
							className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-full"
						>
							Add to Bag
						</button>
					)
				) : inCart && inCart.includes(!product._id) ? (
					<button className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-full">In Cart</button>
				) : (
					<button className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-full">Out of stock</button>
				)}

				<button
					onClick={() => addToWish(product._id, setWishList)}
					className={`${
						isWish(product._id, wishList) ? 'hidden' : ''
					}  w-full h-14 flex items-center justify-center bg-white text-black/30 border border-black/30 rounded-full`}
				>
					<span className="text-lg font-medium">Favourite</span>
				</button>
				<button
					onClick={() => removeToWish(product._id, setWishList)}
					className={`${
						!isWish(product._id, wishList) ? 'hidden' : ''
					}  w-full h-14 flex items-center justify-center bg-white text-red-500 border border-red-200 rounded-full`}
				>
					<BsHeartFill />
					<span className="ml-3 text-lg font-medium">Favourite</span>
				</button>
			</div>
		</div>
	);
};

export default SingleProductInfo;
