import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsDash, BsPlus } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Layout, { LayoutContext } from '../Layout';
import { getSingleProduct } from './FetchApi';

const ProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	const [currentImage, setCurrentImage] = useState(0);
	const [readMore, setReadMore] = useState(false);

	useEffect(() => {
		fetchSingleProduct();
		// eslint-disable-next-line
	}, []);

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

	const nextSlide = () => setCurrentImage(currentImage === product.images.length - 1 ? 0 : currentImage + 1);
	const prevSlide = () => setCurrentImage(currentImage === 0 ? product.images.length - 1 : currentImage - 1);

	if (state.loading) {
		return <div>Loading</div>;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section>
			<div className="py-4 px-8 border-b border-black/10 lg:px-4 flex items-center justify-between">
				<div>1</div>
				<div>2</div>
			</div>
			<div className="p-8 lg:p-4 flex md:flex-col space-x-12 lg:space-x-4 md:space-x-0 md:space-y-12 select-none">
				{/* Product images */}
				<div className="w-1/2 md:w-full flex lg:flex-col-reverse">
					<div className="md:hidden w-1/6 mt-0 lg:mt-8 lg:w-full flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 overflow-x-scroll">
						{product.images.length > 0 &&
							product.images.map((img, index) => {
								return (
									<img
										key={index}
										alt={product.name}
										onClick={() => setCurrentImage(index)}
										className={`p-1 w-24 h-24 lg:w-16 lg:h-16 object-contain border ${
											currentImage === index ? 'border-black' : 'border-black/10'
										} cursor-pointer duration-200 ease-in-out`}
										src={`http://localhost:3000/uploads/products/${img}`}
									/>
								);
							})}
					</div>
					<div className="w-5/6 lg:w-full h-[620px] sm:h-full relative">
						<span className="absolute bottom-0 right-4 md:right-2 transform -translate-y-1/2 text-sm font-semibold mix-blend-difference text-white">
							{currentImage + 1} / {product.images.length}
						</span>
						<span
							onClick={() => prevSlide()}
							className="absolute top-1/2 left-4 md:left-0 transform -translate-y-1/2 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center border border-white duration-200 ease-in-out cursor-pointer"
						>
							<BsChevronLeft />
						</span>
						{product.images.length > 0 && (
							<img
								alt={product.name}
								className="w-full h-full object-cover hover:cursor-zoom-in"
								src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
							/>
						)}
						<span
							onClick={() => nextSlide()}
							className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 hover:bg-gray-100 w-10 h-10  rounded-full flex items-center justify-center border border-white duration-200 ease-in-out cursor-pointer"
						>
							<BsChevronRight />
						</span>
					</div>
				</div>

				{/* Product detail */}
				<div className="w-1/2 md:w-full">
					<div className="mb-8 flex items-start justify-between">
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
					<div className="mb-8">
						<p className="text-justify">
							{product.description.length < 400
								? product.description
								: readMore
								? product.description + ' '
								: product.description.slice(0, 400) + '...'}

							{product.description.length > 400 && (
								<span
									onClick={() => setReadMore(!readMore)}
									className="ml-1 text-black/50 italic cursor-pointer"
								>
									{readMore ? 'hide' : 'read more'}
								</span>
							)}
						</p>
					</div>
					<div className="mb-8 flex flex-col">
						<span className="mb-2">Quantity: {product.quantity}</span>
						<div className="flex items-center">
							<span className="w-8 h-8 rounded-md cursor-pointer border border-black/10 hover:border-black flex items-center justify-center duration-200 ease-in-out">
								<BsDash />
							</span>
							<span className="w-12 text-center text-sm">1</span>
							<span className="w-8 h-8 rounded-md cursor-pointer border border-black/10 hover:border-black flex items-center justify-center duration-200 ease-in-out">
								<BsPlus />
							</span>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<button className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-md">
							Add to bag
						</button>
						<button className="w-full h-14 text-lg font-medium bg-white text-black/50 border border-black/20 rounded-md">
							Favourite
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

const Product = () => {
	return <Layout children={<ProductSection />} />;
};

export default Product;
