import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LayoutContext, Layout } from '..';
import { getSingleProduct, getListRelated } from './FetchApi';
import { BsArrowLeft, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ListRelated from './ListRelated';
import Reviews from './Reviews';
import Loading from '../layout/Loading';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, listProduct: lists, loading } = state;

	const [qty, setQty] = useState(1);
	const [alert, setAlert] = useState(false);
	const [readMore, setReadMore] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		fetchSingleProduct();
		fetchListRealted();

		// eslint-disable-next-line
	}, [id]);

	const fetchSingleProduct = async () => {
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

	const fetchListRealted = async () => {
		try {
			const res = await getListRelated(id);
			if (res && res.data.lists) {
				dispatch({ type: 'listProduct', payload: res.data.lists });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <Loading />;
	} else if (!product) {
		return <div className="text-sm font-light text-black/50 italic">Product not found</div>;
	}

	return (
		<section className="divide-y divide-black/10">
			<div className="py-4 px-8 md:px-4 flex items-center">
				<div className="flex items-center text-sm space-x-2 text-black/50">
					<Link to="/">Home</Link>
					<span>/</span>
					<Link to="/shop">Shop</Link>
					<span>/</span>
					<p>{product ? product.category.name : ''}</p>
					<span>/</span>
					<p className="cursor-pointer font-medium text-black">{product ? product.name : ''}</p>
				</div>
			</div>
			<div className="w-full h-full flex md:flex-col">
				{/* Product images */}
				<div className="md:p-4 w-1/2 md:w-full border-r border-black/10 select-none">
					<div className="md:hidden grid grid-cols-1 gap-2">
						{product.images.length > 0 &&
							product.images.map((img, index) => (
								<img key={index} alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="w-full h-full object-cover" />
							))}
					</div>
					<div className="hidden md:block relative">
						<img
							alt={product.name}
							src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
							className="w-full h-full object-cover"
						/>
						<div className="absolute right-4 bottom-4">
							<span className="font-bold">
								{currentImage + 1} / {product.images.length}
							</span>
						</div>
						<span className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-transparent text-black/50 hover:bg-gray-100 hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out">
							<BsChevronLeft className="text-xl" />
						</span>
						<span className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-transparent text-black/50 hover:bg-gray-100 hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out">
							<BsChevronRight className="text-xl" />
						</span>
					</div>
				</div>
				{/* Product detail */}
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
							<span className="w-8 h-8 rounded-md flex items-center justify-center border border-black/20 hover:border-black cursor-pointer duration-200 ease-in-out">
								-
							</span>
							<span className="w-12 text-center text-base sm:text-sm">{qty}</span>
							<span className="w-8 h-8 rounded-md flex items-center justify-center border border-black/10 hover:border-black cursor-pointer duration-200 ease-in-out">
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
						<button className="w-full h-14 text-lg font-medium bg-black text-white border border-black rounded-full">Add to Bag</button>

						<button className="w-full h-14 flex items-center justify-center bg-white text-black/30 border border-black/30 rounded-full">
							<span className="text-lg font-medium">Favourite</span>
						</button>
					</div>
				</div>
			</div>
			{/* <Reviews /> */}
			<div className="p-32 xl:p-28 lg:p-24 md:py-20 md:px-4 space-y-8 md:space-y-6 sm:space-y-4">
				<h4 className="text-3xl md:text-2xl sm:text-xl font-bold">Simplicity</h4>
				<p className="text-justify sm:text-sm">
					Each Rains product is initiated to honor and challenge traditional perceptions of rainwear. In conjunction to providing quality waterproof
					products, Rains apparel, bags, and accessories are designed to mix function with fashion.
				</p>
			</div>
			{/* <ListRelated lists={lists} /> */}
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;
