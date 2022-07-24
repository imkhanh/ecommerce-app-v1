import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsX } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout/Layout';
import { getDataApi, postDataApi } from '../Api/FetchData';
import Loading from '../Layout/Loading';
import RatingReviews from './RatingReviews';
import DeliverySection from './DeliverySection';
import ImageSection from './ImageSection';
import { isWish, addToWishList, removeToWishList, handleAddToCart, cartList } from './Actions';
import { isAuth } from '../Auth/Auth';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, loading } = state;

	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(0);
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [alert, setAlert] = useState(false);
	const [qty, setQty] = useState(1);
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));

	useEffect(() => {
		window.document.title = 'Product Detail';
	}, []);

	useEffect(() => {
		fetchSingleProduct();
		// eslint-disable-next-line
	}, []);

	const fetchSingleProduct = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getDataApi(`/single-product/${id}`);
			setImages(res.data.product.images);
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
			dispatch({ type: 'inCart', payload: cartList() });
		} catch (error) {
			console.log(error);
		}

		fetchCartProduct();
	};

	const fetchCartProduct = async () => {
		const cartProduct = [];
		const cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			for (const c of cart) {
				cartProduct.push(c._id);
			}
		}

		try {
			const res = await postDataApi('/add-cart', cartProduct);
			dispatch({ type: 'cartProduct', payload: res.data.products });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeSlide = (type) => {
		if (type === 'next') {
			setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
		} else if (type === 'prev') {
			setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
		}
	};

	if (loading) {
		return <Loading />;
	} else if (!product) {
		return <div>No product found</div>;
	}

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
				{/*left side*/}
				<div className="w-4/6 lg:w-1/2 md:w-full transition-all">
					<div className={`md:hidden grid ${images.length <= 2 ? 'grid-cols-1' : 'grid-cols-2'} lg:grid-cols-1 gap-3 transition-all`}>
						{images.length > 0 &&
							images.map((img, index) => (
								<Zoom key={index} zoomMargin={40}>
									<img alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="h-full w-full object-cover" />
								</Zoom>
							))}
					</div>
				</div>
				{/*right size*/}
				<div className="sticky top-20 w-2/6 h-full lg:w-1/2 md:w-full transition-all">
					<div className="mb-8 space-y-8">
						<div>
							<h1 className="text-3xl text-black font-bold">{product.name}</h1>
							<p className="mb-3 text-base text-black/80 font-medium">{product.category.name}</p>
							<p>${product.price}</p>
						</div>

						<ImageSection product={product} currentImage={currentImage} handleChangeSlide={handleChangeSlide} />

						<div className="flex flex-col">
							<span className="mb-2 text-sm font-medium">Sizes</span>
							<div className="grid grid-cols-4 gap-3">
								{product.sizes.map((s, index) => (
									<span
										key={index}
										onClick={() => setSize(s)}
										className={`py-3 px-5 text-base flex items-center justify-center border ${
											size === s ? 'border-black' : 'border-gray-200'
										} rounded-md hover:border-black cursor-pointer select-none transition-colors`}
									>
										{s}
									</span>
								))}
							</div>
						</div>

						<div className="flex flex-col">
							<span className="mb-2 text-sm font-medium">Colors</span>
							<div className="grid grid-cols-4 gap-2">
								{product.colors.map((c, index) => (
									<span
										key={index}
										onClick={() => setColor(c)}
										className={`py-3 px-5 text-base flex items-center justify-center border ${
											color === c ? 'border-black' : 'border-gray-200'
										} rounded-md hover:border-black cursor-pointer select-none transition-colors`}
									>
										{c}
									</span>
								))}
							</div>
						</div>

						{product.quantity !== 0 && (
							<div className="flex flex-col">
								<span className="text-sm mb-4">Quantity: {product.quantity}</span>
								<div className="flex items-center">
									<span className="quantity-button">-</span>
									<span className="w-8 text-sm text-center">{qty}</span>
									<span className="quantity-button">+</span>
								</div>
							</div>
						)}

						{alert && (
							<div className="px-4 py-6 relative bg-[#fafafa] text-[#838383]">
								<p className="text-sm font-light">Please choose your size and color</p>
								<span onClick={() => setAlert(false)} className="cursor-pointer select-none absolute top-2 right-2">
									<BsX className="text-2xl" />
								</span>
							</div>
						)}

						<div className="space-y-4">
							{state.inCart !== null && state.inCart.includes(product._id) ? (
								<button className="w-full h-14 text-sm font-medium uppercase border border-black bg-black text-white rounded-full">In Cart</button>
							) : (
								<button
									onClick={() =>
										handleAddToCart(product._id, qty, product.price, color, size, setQty, setColor, setSize, setAlert, dispatch, fetchSingleProduct)
									}
									className="w-full h-14 text-sm font-medium uppercase border border-black bg-black text-white rounded-full"
								>
									Add to bag
								</button>
							)}

							<button
								onClick={() => addToWishList(product._id, setWishList)}
								className={`${
									isWish(product._id, wishList) ? 'hidden' : ''
								} w-full h-14 flex items-center justify-center border border-gray-300 bg-white text-black/50 rounded-full`}
							>
								<BsHeart className="text-2xl" />
							</button>
							<button
								onClick={() => removeToWishList(product._id, setWishList)}
								className={`${
									!isWish(product._id, wishList) ? 'hidden' : ''
								} w-full h-14 flex items-center justify-center border border-red-300 bg-white text-red-500 rounded-full`}
							>
								<BsHeartFill className="text-2xl" />
							</button>
						</div>

						<div>
							<p className="text-sm  font-light text-justify leading-6">{product.description}</p>
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
