import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsShare, BsX } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout/Layout';
import { getSingleProduct, postAddToCart } from './FetchData';
import { isWish, addWish, removeWish } from '../Products/Actions';
import { handleChangeSlide, handleUpdateQuantity, addToCart, cartList } from './Actions';
import Loading from '../Utils/Loading';

import RatingReviews from './RatingReviews';
import ImageSlides from './ImageSlides';
import DeliverySection from './Delivery';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { isAuth } from '../Auth/Auth';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));
	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(0);
	const [alert, setAlert] = useState(false);
	const [readMore, setReadMore] = useState(false);
	const [qty, setQty] = useState(1);

	useEffect(() => {
		document.title = `Product `;
	}, []);

	useEffect(() => {
		fetchSingleProduct();
		// eslint-disable-next-line
	}, []);

	const fetchSingleProduct = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getSingleProduct(id);

			dispatch({ type: 'singleProduct', payload: res.data.product });
			setImages(res.data.product.images);
			dispatch({ type: 'loading', payload: false });
			dispatch({ type: 'inCart', payload: cartList() });
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

	if (state.loading) return <Loading />;
	else if (!product) return null;

	return (
		<section className="max-w-[89rem] w-full mx-auto h-auto p-12 lg:p-8 md:px-4 transition-all">
			<div className="mb-4 md:mb-6 flex items-center text-xs font-light text-black/70 space-x-1">
				<Link to="/" className="hover:text-black">
					Home
				</Link>
				<span>|</span>
				<Link to="/products" className="hover:text-black">
					Products
				</Link>
				<span>|</span>
				<p className="text-black font-normal cursor-pointer">{product.name}</p>
			</div>
			<div className="flex md:flex-col space-x-12 lg:space-x-6 md:space-x-0 transition-all">
				{/* =========  left container ========= */}
				<div className="w-4/6 lg:w-1/2 md:hidden transition-all">
					<div className={`grid ${images.length <= 2 ? 'grid-cols-1' : 'grid-cols-2'} lg:grid-cols-1 gap-3 transition-all`}>
						{images.length > 0 &&
							images.map((img, index) => (
								<Zoom key={index} zoomMargin={80}>
									<img alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="h-full w-full object-cover" />
								</Zoom>
							))}
					</div>
				</div>

				{/* ========= right size ========= */}
				<div className="w-2/6 lg:w-1/2 md:w-full h-full transition-all">
					<div className="mb-12 space-y-8">
						<div className="pb-4 flex items-center justify-between border-b border-gray-200">
							<div>
								<h1 className="text-3xl lg:text-2xl md:text-xl text-black font-bold">{product.name}</h1>
								<p className="mb-3 md:mb-2 text-base md:text-sm text-black/80 font-medium">{product.category.name}</p>
								<p className="md:text-sm">${product.price}</p>
							</div>
							<span className="cursor-pointer text-black/50">
								<BsShare />
							</span>
						</div>

						<ImageSlides product={product} currentImage={currentImage} setCurrentImage={setCurrentImage} handleChangeSlide={handleChangeSlide} />
						<div className="flex flex-col">
							<span className="mb-2 text-sm font-medium">Description</span>
							<p className="text-sm font-light text-justify leading-6">
								{product.description.length < 420 ? product.description : readMore ? product.description + ' ' : product.description.slice(0, 420) + '...'}

								<span onClick={() => setReadMore(!readMore)} className="ml-1 italic text-black font-normal underline cursor-pointer select-none">
									{readMore ? 'hide' : 'read more'}
								</span>
							</p>
						</div>

						{product.quantity !== 0 && (
							<div className="flex flex-col">
								<span className="text-sm mb-4">Quantity: {product.quantity}</span>
								<div className="flex items-center">
									<span onClick={() => handleUpdateQuantity('decrease', qty, product.quantity, setQty, setAlert)} className="quantity-button">
										-
									</span>
									<span className="w-8 text-sm text-center">{qty}</span>
									<span onClick={() => handleUpdateQuantity('increase', qty, product.quantity, setQty, setAlert)} className="quantity-button">
										+
									</span>
								</div>
							</div>
						)}

						{alert && (
							<div className="px-4 py-6 relative bg-[#fafafa] text-[#838383]">
								<p className="text-sm font-light">Stock limited</p>
								<span onClick={() => setAlert(false)} className="cursor-pointer select-none absolute top-2 right-2">
									<BsX className="text-2xl" />
								</span>
							</div>
						)}

						<div className="flex flex-col space-y-4">
							{state.inCart !== null && state.inCart.includes(product._id) ? (
								<button className="add-cart-button bg-gray-900 text-white">In Cart</button>
							) : (
								<>
									{!isAuth() ? (
										<button onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="add-cart-button bg-gray-900 text-white">
											Please login to buy
										</button>
									) : (
										<button onClick={() => addToCart(product._id, qty, product.price, setQty, dispatch, fetchSingleProduct)} className="add-cart-button bg-black text-white border-black">
											Add to Bag
										</button>
									)}
								</>
							)}

							<button onClick={() => addWish(product._id, setWishList)} className={`${isWish(product._id, wishList) ? 'hidden' : ''} wish-button border-gray-300 bg-white text-black/50 `}>
								<span className="mr-1">Favourite</span>
								<BsHeart />
							</button>
							<button onClick={() => removeWish(product._id, setWishList)} className={`${!isWish(product._id, wishList) ? 'hidden' : ''} wish-button border-blue-100  bg-blue-50 text-blue-500`}>
								<span className="mr-1">Favourite</span>
								<BsHeartFill />
							</button>
						</div>
					</div>

					<DeliverySection />
					<RatingReviews />
				</div>
			</div>
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;
