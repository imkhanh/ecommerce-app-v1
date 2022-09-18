import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { isWish, addToWishList, removeWishList } from '../Products/Functions';
import { Link, useParams } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { getSingleProduct, postAddToCart } from './FetchData';
import { nextSlide, prevSlide, updateQuantity, addToCart, cartList } from './Functions';
import Loading from '../Utils/Loading';
import Delivery from './Delivery';
import RatingReviews from './RatingReviews';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, loading } = state;

	const [qty, setQty] = useState(1);
	const [readMore, setReadMore] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getSingleProduct(id);
			setTimeout(() => {
				dispatch({ type: 'singleProduct', payload: res.data.product });
				dispatch({ type: 'loading', payload: false });
				dispatch({ type: 'inCart', payload: cartList() });
			}, 1000);
		} catch (error) {
			console.log(error);
		}

		fetchAddToCart();
	};

	const fetchAddToCart = async () => {
		try {
			const res = await postAddToCart();
			dispatch({ type: 'carts', payload: res.data.products });
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <Loading />;
	} else if (!product) {
		return <div className="text-black/50 italic">No product found</div>;
	}

	return (
		<section className="p-8 lg:p-4 max-w-7xl mx-auto w-full bg-white duration-200 ease-in-out">
			<div className="mb-8 lg:mb-4 flex items-center text-black/80 text-xs font-light space-x-2">
				<Link to="/" className="hover:text-black/50">
					Home
				</Link>
				<div>/</div>
				<div className="hover:text-black/50 cursor-pointer">Product</div>
				<div>/</div>
				<div className="text-black font-medium cursor-pointer">{product.name}</div>
			</div>

			<div className="grid grid-cols-8 gap-16 lg:gap-8 duration-200 ease-in-out">
				<div className="col-span-5 lg:col-span-4 md:col-span-8 duration-200 ease-in-out">
					<div className="hidden md:block relative">
						<span
							onClick={() => prevSlide(product.images, currentImage, setCurrentImage)}
							className="absolute top-1/2 left-3 transform -translate-y-1/2 w-10 h-10 bg-gray-50 hover:bg-white rounded-full flex items-center justify-center cursor-pointer select-none"
						>
							<BsChevronLeft />
						</span>
						<span
							onClick={() => nextSlide(product.images, currentImage, setCurrentImage)}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 w-10 h-10 bg-gray-50 hover:bg-white rounded-full flex items-center justify-center cursor-pointer select-none"
						>
							<BsChevronRight />
						</span>
						<img
							alt={product.name}
							className="w-full h-full object-cover"
							src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
						/>
						<div className="absolute left-3 bottom-3 bg-white z-10 max-w-[70px] w-full h-7 text-sm font-light flex items-center justify-center shadow-xl border border-gray-50 rounded-full space-x-1">
							<span className="font-medium">{currentImage + 1}</span> <span>of {product.images.length}</span>
						</div>
					</div>
					<div className={`md:hidden grid ${product.images.length === 2 ? 'grid-cols-1' : 'grid-cols-2'} lg:grid-cols-1 gap-2`}>
						{product.images.length > 0 &&
							product.images.map((img, index) => {
								return <img key={index} alt={product.name} className="w-22 h-22 object-cover" src={`http://localhost:3000/uploads/products/${img}`} />;
							})}
					</div>
				</div>
				<div className="col-span-3 lg:col-span-4 md:col-span-8 bg-white">
					<div className="mb-8 pb-4 border-b border-gray-200">
						<h1 className="text-xl font-bold text-black">{product.name}</h1>
						<p className="text-gray-500">{product.category.name}</p>
						<p className="mt-3 text-black font-medium">${product.price}</p>
					</div>
					<div className="mb-8 space-y-2">
						<span className="text-black text-sm">Description</span>
						<p className="text-sm font-light text-black/80 text-justify leading-6">
							{product.description.length < 395 ? product.description : readMore ? product.description : product.description.slice(0, 395) + '...'}
							<span
								onClick={() => setReadMore(!readMore)}
								className="ml-1 italic text-black/50 hover:text-black hover:underline cursor-pointer select-none"
							>
								{readMore ? 'hidden' : 'read more'}
							</span>
						</p>
					</div>
					<div className="mb-8 space-y-2">
						<span className="text-black text-sm">Quantity: {product.quantity}</span>
						<div className="flex items-center">
							<span
								onClick={() => updateQuantity('descrease', qty, setQty, product.quantity)}
								className="w-10 h-8 border border-gray-300 hover:border-black rounded-md flex items-center justify-center cursor-pointer select-none duration-200 ease-in-out"
							>
								-
							</span>
							<span className="max-w-[45px] w-full text-center">{qty}</span>
							<span
								onClick={() => updateQuantity('increase', qty, setQty, product.quantity)}
								className="w-10 h-8 border border-gray-300 hover:border-black rounded-md flex items-center justify-center cursor-pointer select-none duration-200 ease-in-out"
							>
								+
							</span>
						</div>
					</div>
					<div className="mb-8 flex flex-col space-y-3">
						{product.quantity !== 0 && state.inCart && state.inCart.includes(product._id) ? (
							<button className="w-full h-14 bg-black/80 cursor-not-allowed text-white flex items-center justify-center rounded-full">
								<span className="ml-2 font-medium">In Cart</span>
							</button>
						) : (
							<button
								onClick={() => addToCart(product._id, qty, product.price, setQty, dispatch, fetchData)}
								className="w-full h-14 bg-black text-white hover:bg-black/90 flex items-center justify-center rounded-full"
							>
								<span className="ml-2 font-medium">Add to Bag</span>
							</button>
						)}

						<button
							onClick={() => addToWishList(product._id, setWishList)}
							className={`${
								isWish(product._id, wishList) ? 'hidden' : ''
							} w-full h-14 bg-white text-gray-400 border border-gray-200 hover:border-black flex items-center justify-center rounded-full duration-200 ease-in-out`}
						>
							<BsHeart />
							<span className="ml-2">Favourite</span>
						</button>
						<button
							onClick={() => removeWishList(product._id, setWishList)}
							className={`${
								!isWish(product._id, wishList) ? 'hidden' : ''
							} w-full h-14 text-blue-500 bg-white border border-blue-200 hover:border-blue-500 flex items-center justify-center rounded-full duration-200 ease-in-ou`}
						>
							<BsHeartFill />
							<span className="ml-2">Favourite</span>
						</button>
					</div>

					<div className="divide-y divide-gray-200 border-y border-gray-200">
						<Delivery />
						<RatingReviews />
					</div>
				</div>
			</div>

			<div className="py-12">
				<h1 className="text-xl lg:text-lg uppercase font-bold">you also might like</h1>
			</div>
		</section>
	);
};
export default SingleProductSection;
