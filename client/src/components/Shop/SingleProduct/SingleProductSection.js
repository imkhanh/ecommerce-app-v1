import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LayoutContext } from '..';
import ProductHeader from './ProductHeader';
import { getSingleProduct } from './FetchApi';
import Zoom from 'react-medium-image-zoom';
import Loading from '../Layout/Loading';
import 'react-medium-image-zoom/dist/styles.css';
import { BsArrowLeft, BsChevronLeft, BsChevronRight, BsHeart } from 'react-icons/bs';
import ListRelated from './ListRelated';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, loading } = state;

	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		fetchAllProducts();
		// eslint-disable-next-line
	}, []);

	const fetchAllProducts = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getSingleProduct(id);
			setTimeout(() => {
				if (res && res.data.product) {
					dispatch({ type: 'singleProduct', payload: res.data.product });
					dispatch({ type: 'loading', payload: false });
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <Loading type="spinningBubbles" width={40} height={40} />;
	} else if (!product) {
		return <div className="text-sm font-light text-black/50 italic">Product not found</div>;
	}

	return (
		<section>
			<ProductHeader />
			<div className="w-full h-full flex md:flex-col select-none">
				{/* Product images */}

				<div className="md:p-4 w-1/2 md:w-full border-r border-black/10">
					<div className="md:hidden grid grid-cols-1 gap-2">
						{product.images.length > 0 &&
							product.images.map((img, index) => {
								return (
									<Zoom key={index}>
										<img alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="w-full h-full object-cover" />
									</Zoom>
								);
							})}
					</div>
					<div className="hidden md:block relative">
						<Zoom>
							<img
								alt={product.name}
								src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
								className="w-full h-full object-cover"
							/>
						</Zoom>
						<div className="absolute right-4 bottom-4">
							<span className="text-sm font-bold">
								{currentImage + 1} / {product.images.length}
							</span>
						</div>
						<span className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-gray-50 text-black/50 hover:bg-white hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out">
							<BsChevronLeft className="text-xl" />
						</span>
						<span className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-gray-50 text-black/50 hover:bg-white hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out">
							<BsChevronRight assName="text-xl" />
						</span>
					</div>
				</div>

				{/* Product detail */}

				<div className="px-20 py-32 lg:px-10 lg:py-16 md:px-4 md:py-8 w-1/2 md:w-full h-full sticky top-14 bg-white space-y-8 z-10 duration-200 ease-in-out">
					<div className="flex flex-col space-y-4 md:space-y-2">
						<Link to="/shop" className="italic text-black/50 hover:text-black flex items-center underline underline-offset-4">
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
						<span className="block mb-2 font-medium">Description</span>
						<p className="text-black font-light text-justify">{product.description}</p>
					</div>

					<div>
						<span className="block mb-2 font-medium">Quantity: {product.quantity}</span>
						<div className="flex items-center">
							<span className="w-8 h-8 rounded-md flex items-center justify-center border border-black/20 hover:border-black cursor-pointer duration-200 ease-in-out">
								-
							</span>
							<span className="w-14 text-center">1</span>
							<span className="w-8 h-8 rounded-md flex items-center justify-center border border-black/10 hover:border-black cursor-pointer duration-200 ease-in-out">
								+
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<button className="w-full h-14 text-lg bg-black text-white border border-black rounded-full">Add to Bag</button>
						<button className="w-full h-14 flex items-center justify-center text-lg bg-white text-black/30 border border-black/30 rounded-full">
							<BsHeart />
							<span className="ml-3 text-lg">Favourite</span>
						</button>
					</div>
				</div>

				{/* Reviews */}
			</div>

			<ListRelated />
		</section>
	);
};

export default SingleProductSection;
