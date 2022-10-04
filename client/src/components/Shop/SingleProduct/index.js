import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsDash, BsHeart, BsHeartFill, BsPlus, BsX } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, postAddToCart } from './FetchApi';
import { isWish, addToWishList, removeToWishList } from '../Products/Functions';
import { cartList, changeSlide, updateQuantity, addToCart } from './Functions';
import RatingReviews from './RatingReviews';
import ListProduct from './ListProduct';
import Loading from '../Common/Loading';
import { BASE_URL } from '../../../url';

const ProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	const [readMore, setReadMore] = useState(false);
	const [alert, setAlert] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [currentImage, setCurrentImage] = useState(0);
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));

	useEffect(() => {
		fetchSingleProduct();
		// eslint-disable-next-line
	}, [id]);

	const fetchSingleProduct = async () => {
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

		fetchCartProduct();
	};

	const fetchCartProduct = async () => {
		try {
			const res = await postAddToCart();
			dispatch({ type: 'cartProduct', payload: res.data.products });
		} catch (error) {
			console.log(error);
		}
	};

	if (state.loading) {
		return <Loading />;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section>
			<div className="py-4 px-8 lg:px-4 border-b border-black/10">
				<div className="text-sm md:text-xs flex items-center text-black/50 space-x-2 font-light">
					<Link to="/">Home</Link>
					<div>/</div>
					<Link to="/shop">Shop</Link>
					<div>/</div>
					<div>{product && product.brand}</div>
					<div>/</div>
					<div>{product && product.category.name}</div>
					<div>/</div>
					<div className="text-black font-normal">{product && product.name}</div>
				</div>
			</div>
			<div className="p-8 lg:p-4 flex md:flex-col space-x-24 xl:space-x-12 md:space-x-0 md:space-y-12 select-none">
				{/* Product images */}
				<div className="w-1/2 md:w-full flex md:flex-col">
					<div className="relative w-[5%] md:hidden">
						{product.images && product.images.length > 1 && (
							<div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-gray-200 px-2 py-5 flex flex-col rounded-full space-y-2">
								{product.images.length > 0 &&
									product.images.map((item, index) => {
										return (
											<span
												key={index}
												onClick={() => setCurrentImage(index)}
												className={`${
													currentImage === index ? 'h-6 bg-black' : 'bg-black/40  w-[6px] h-[6px]'
												} rounded-full cursor-pointer select-none duration-200 ease-in`}
											></span>
										);
									})}
							</div>
						)}
					</div>

					<div
						className="w-[95%] md:w-full h-[710px] md:h-[500px] relative"
						style={{
							backgroundImage: `url(${BASE_URL}/uploads/products/${product.images[currentImage]})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							objectFit: 'contain',
						}}
					>
						<span className="hidden md:block absolute bottom-0 left-4 md:right-2 transform -translate-y-1/2 text-sm font-semibold mix-blend-difference text-white">
							{currentImage + 1} / {product.images.length}
						</span>
						{product.images && product.images.length > 1 && (
							<>
								<span
									onClick={() => changeSlide('prevSlide', currentImage, setCurrentImage, product.images)}
									className="absolute top-1/2 left-4 md:left-0 transform -translate-y-1/2 hover:bg-gray-100 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center  duration-200 ease-in-out cursor-pointer"
								>
									<BsChevronLeft />
								</span>
								<span
									onClick={() => changeSlide('nextSlide', currentImage, setCurrentImage, product.images)}
									className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 hover:bg-gray-100 w-12 h-12 md:w-10 md:h-10  rounded-full flex items-center justify-center duration-200 ease-in-out cursor-pointer"
								>
									<BsChevronRight />
								</span>
							</>
						)}
					</div>
				</div>

				{/* Product detail */}
				<div className="w-1/2 md:w-full space-y-10">
					<div className="flex items-start justify-between">
						<div className="flex flex-col space-y-3">
							<h1 className="font-bold text-3xl lg:text-2xl md:text-xl text-black">{product.name}</h1>
							<p className="text-base font-medium text-gray-600">{product.category.name}</p>
							<p className="text-xl font-semibold text-black">${product.price}.00</p>
						</div>
						{product.status && (
							<span
								className={`py-[6px] px-4 rounded-full border border-black/10 text-xs uppercase font-semibold cursor-pointer ${
									product.status === 'New'
										? 'border-black/10 text-black bg-white'
										: product.status === 'Sold Out'
										? 'border-red-100 text-red-700 bg-red-100'
										: product.status === 'Sale' && 'bg-amber-100 text-amber-800 border-amber-100'
								}`}
							>
								{product.status}
							</span>
						)}
					</div>
					<div>
						<span className="mb-2 block">Description</span>
						<p className="text-justify">
							{product.description.length < 400
								? product.description
								: readMore
								? product.description + ' '
								: product.description.slice(0, 400) + '...'}

							{product.description.length > 400 && (
								<span onClick={() => setReadMore(!readMore)} className="ml-1 text-black/50 cursor-pointer">
									{readMore ? 'hide' : 'read more'}
								</span>
							)}
						</p>
					</div>

					<div>
						<span className="mb-2 block">Quantity: {product.quantity}</span>
						{product.quantity !== 0 && (
							<div className="flex items-center">
								<span
									onClick={() => updateQuantity('decrease', quantity, setQuantity, product.quantity, setAlert)}
									className="w-8 h-8 rounded-full bg-white text-black border border-black/20 flex items-center justify-center cursor-pointer hover:border-black transition-colors"
								>
									<BsDash />
								</span>
								<span className="w-10 text-center">{quantity}</span>
								<span
									onClick={() => updateQuantity('increase', quantity, setQuantity, product.quantity, setAlert)}
									className="w-8 h-8 rounded-full bg-white text-black border border-black/20 flex items-center justify-center cursor-pointer hover:border-black transition-colors"
								>
									<BsPlus />
								</span>
							</div>
						)}

						{alert && (
							<div className="mt-4 py-6 px-4 flex items-center justify-between bg-gray-100">
								<span className="text-sm text-black/50">Stock limited</span>
								<span
									onClick={() => setAlert(false)}
									className="text-2xl text-black/50 hover:text-black cursor-pointer select-none"
								>
									<BsX />
								</span>
							</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-2">
						{product.quantity !== 0 ? (
							state.inCart && state.inCart.includes(product._id) ? (
								<button className="w-full h-14 text-lg lg:text-base font-medium bg-black text-white border border-black">
									In Cart
								</button>
							) : (
								<button
									onClick={() =>
										addToCart(product._id, quantity, product.price, setQuantity, dispatch, fetchSingleProduct)
									}
									className="w-full h-14 text-lg lg:text-base font-medium bg-black text-white border border-black"
								>
									Add to bag
								</button>
							)
						) : (
							<button className="w-full h-14 text-lg lg:text-base font-medium bg-black/80 text-white border border-black">
								Out of Stock
							</button>
						)}

						<button
							onClick={() => addToWishList(product._id, setWishList)}
							className={`${
								isWish(product._id, wishList) ? 'hidden' : ''
							} w-full h-14 flex items-center justify-center text-lg lg:text-base font-medium bg-white text-black/50 border border-black/20`}
						>
							<span className="mr-2">Favourite</span>
							<BsHeart />
						</button>
						<button
							onClick={() => removeToWishList(product._id, setWishList)}
							className={`${
								!isWish(product._id, wishList) ? 'hidden' : ''
							} w-full h-14 flex items-center justify-center text-lg lg:text-base font-medium bg-white text-blue-500 border border-blue-500`}
						>
							<span className="mr-2">Favourite</span>
							<BsHeartFill />
						</button>
					</div>
				</div>
			</div>

			<RatingReviews />
			<ListProduct />
		</section>
	);
};

const Product = () => {
	return <Layout children={<ProductSection />} />;
};

export default Product;
