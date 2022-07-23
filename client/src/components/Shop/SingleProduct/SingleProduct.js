import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout/Layout';
import { getDataApi } from '../Api/FetchData';
import Loading from '../Layout/Loading';
import RatingReviews from './RatingReviews';
import DeliverySection from './DeliverySection';
import ImageSection from './ImageSection';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SingleProductSection = () => {
	const { id } = useParams();
	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(0);
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	useEffect(() => {
		window.document.title = 'Product Detail';
	}, []);

	useEffect(() => {
		getSingleProduct();
		// eslint-disable-next-line
	}, []);

	const getSingleProduct = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getDataApi(`/single-product/${id}`);
			setImages(res.data.product.images);
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
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

	if (state.loading) {
		return <Loading />;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="max-w-[89rem] w-full mx-auto h-auto p-12 lg:p-8 md:px-4 transition-all">
			<div className="mb-4 md:mb-6 flex items-center text-xs font-light text-black/70 space-x-1">
				<Link to="/" className="text-black font-normal">
					Home
				</Link>
				<span>|</span>
				<Link to="/" className="hover:text-black">
					Product
				</Link>
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
				<div className="sticky top-20 h-full w-2/6 lg:w-1/2 md:w-full transition-all">
					<div className="mb-8 space-y-8">
						<div>
							<h1 className="text-3xl text-black font-bold">{product.name}</h1>
							<p className="mb-3 font-medium">{product.category.name}</p>
							<p>${product.price}</p>
						</div>

						<ImageSection product={product} currentImage={currentImage} handleChangeSlide={handleChangeSlide} />

						<div className="flex flex-col">
							<span className="mb-2 text-sm font-medium">Sizes</span>
							<div className="grid grid-cols-4 gap-3">
								{product.sizes.map((s, index) => (
									<span key={index} onClick={() => setSize(s)} className={`py-3 px-5 flex items-center justify-center border ${size === s ? 'border-black' : 'border-gray-200'} rounded-md cursor-pointer select-none transition-all`}>
										{s}
									</span>
								))}
							</div>
						</div>
						<div className="flex flex-col">
							<span className="mb-2 text-sm font-medium">Colors</span>
							<div className="grid grid-cols-4 gap-2">
								{product.colors.map((c, index) => (
									<span key={index} onClick={() => setColor(c)} className={`py-3 px-5 flex items-center justify-center border ${color === c ? 'border-black' : 'border-gray-200'} rounded-md cursor-pointer select-none transition-all`}>
										{c}
									</span>
								))}
							</div>
						</div>

						<div className="flex flex-col">
							<span className="text-sm mb-4">Quantity: {product.quantity}</span>
							<div className="flex items-center">
								<span className="quantity-button">-</span>
								<span className="w-12 text-sm text-center">1</span>
								<span className="quantity-button">+</span>
							</div>
						</div>

						<div className="space-y-4">
							<button className="w-full h-14 border border-black bg-black text-white rounded-full">Add to bag</button>
							<button className="w-full h-14 flex items-center justify-center border border-gray-300 bg-white text-black/50 rounded-full">
								<BsHeart className="text-2xl" />
							</button>
						</div>
						<div>
							<p className="text-sm font-light text-justify leading-6">{product.description}</p>
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
