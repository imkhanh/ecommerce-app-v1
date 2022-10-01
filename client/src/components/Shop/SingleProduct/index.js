import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsDash, BsHeart, BsHeartFill, BsPlus, BsX } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from './FetchApi';
import { isWish, addToWishList, removeToWishList } from '../Products/Functions';
import { changeSlide, updateQuantity } from './Functions';
import RatingReviews from './RatingReviews';
import ListProduct from './ListProduct';
import Loading from '../Common/Loading';

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
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
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
				<div className="text-sm flex items-center text-black/50 space-x-1">
					<Link to="/">Home</Link>
					<div>/</div>
					<Link to="/shop">Shop</Link>
					<div>/</div>
					<div className="text-black">{product && product.name}</div>
				</div>
			</div>
			<div className="p-8 lg:p-4 flex md:flex-col space-x-24 xl:space-x-12 lg:space-x-4 md:space-x-0 md:space-y-12 select-none">
				{/* Product images */}
				<div className="w-1/2 md:w-full flex lg:flex-col-reverse">
					<div className="w-1/6 mt-0 lg:mt-8 md:mt-4 lg:w-full flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 overflow-x-scroll">
						{product.images.length > 0 &&
							product.images.map((img, index) => {
								return (
									<img
										key={index}
										alt={product.name}
										onClick={() => setCurrentImage(index)}
										className={`p-1 w-20 h-20 lg:w-16 lg:h-16 md:w-14 md:h-14 object-contain border ${
											currentImage === index ? 'border-black opacity-100' : 'border-black/10 opacity-70'
										} cursor-pointer duration-200 ease-in-out`}
										src={`http://localhost:3000/uploads/products/${img}`}
									/>
								);
							})}
					</div>
					<div
						className="w-5/6 lg:w-full h-[620px] relative"
						style={{
							backgroundImage: `url(http://localhost:3000/uploads/products/${product.images[currentImage]})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					>
						<span className="absolute bottom-0 right-4 md:right-2 transform -translate-y-1/2 text-sm font-semibold mix-blend-difference text-white">
							{currentImage + 1} / {product.images.length}
						</span>
						<span
							onClick={() => changeSlide('prevSlide', currentImage, setCurrentImage, product.images)}
							className="absolute top-1/2 left-4 md:left-0 transform -translate-y-1/2 hover:bg-gray-100 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white duration-200 ease-in-out cursor-pointer"
						>
							<BsChevronLeft />
						</span>
						<span
							onClick={() => changeSlide('nextSlide', currentImage, setCurrentImage, product.images)}
							className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 hover:bg-gray-100 w-12 h-12 md:w-10 md:h-10  rounded-full flex items-center justify-center border border-white duration-200 ease-in-out cursor-pointer"
						>
							<BsChevronRight />
						</span>
					</div>
				</div>

				{/* Product detail */}
				<div className="w-1/2 md:w-full space-y-10">
					<div className="flex items-start justify-between">
						<div className="flex flex-col space-y-2">
							<h1 className="font-bold text-3xl lg:text-2xl md:text-xl text-black">{product.name}</h1>
							<p className="text-base font-medium text-gray-600">{product.category.name}</p>
							<p className="text-lg font-semibold text-black">${product.price}.00</p>
						</div>
						{product.status && (
							<span
								className={`py-[6px] px-4 rounded-full border border-black/10 text-xs uppercase font-semibold cursor-pointer ${
									product.status === 'New'
										? 'border-black/10 text-black bg-white'
										: product.status === 'Pre Order'
										? 'border-gray-50 text-gray-500 bg-gray-200'
										: product.status === 'Sold Out'
										? 'border-red-100 text-red-700 bg-red-100'
										: product.status === 'Sale' && 'bg-amber-100 text-amber-800 border-amber-100'
								}`}
							>
								{product.status}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<span>Description</span>
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
					<div className="space-y-2">
						<span>Quantity: {product.quantity}</span>
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
						{alert && (
							<div className="py-6 px-4 flex items-center justify-between bg-gray-100">
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
					<div className="grid grid-cols-3 gap-3">
						<button className="col-span-2 w-full h-14 text-lg lg:text-base font-medium bg-black text-white border border-black">
							Add to bag
						</button>

						<button
							onClick={() => addToWishList(product._id, setWishList)}
							className={`${
								isWish(product._id, wishList) ? 'hidden' : ''
							} col-span-1 w-full h-14 flex items-center justify-center text-lg lg:text-base font-medium bg-white text-black/50 border border-black/20`}
						>
							<span className="mr-2">Favourite</span>
							<BsHeart />
						</button>
						<button
							onClick={() => removeToWishList(product._id, setWishList)}
							className={`${
								!isWish(product._id, wishList) ? 'hidden' : ''
							} col-span-1 w-full h-14 flex items-center justify-center text-lg lg:text-base font-medium bg-white text-blue-500 border border-blue-500`}
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
