import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsHeart, BsX } from 'react-icons/bs';
import Layout, { LayoutContext } from '../Layout/Layout';
import { getDataApi } from '../Utils/FetchData';
import Loading from '../Utils/Loading';

import RatingReviews from './RatingReviews/RatingReviews';
import ImageSection from './Sections/ImageSection';
import DeliverySection from './Sections/DeliverySection';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ColorSection from './Sections/ColorSection';

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

	useEffect(() => {
		document.title = `Product `;
	}, []);

	useEffect(() => {
		const fetchSingleProduct = async () => {
			dispatch({ type: 'loading', payload: true });
			try {
				const res = await getDataApi(`/single-product/${id}`);

				dispatch({ type: 'singleProduct', payload: res.data.product });
				setImages(res.data.product.images);
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		};

		fetchSingleProduct();
		// eslint-disable-next-line
	}, []);

	const handleChangeSlide = (type) => {
		if (type === 'next') {
			setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
		} else if (type === 'prev') {
			setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
		}
	};

	const handleUpdateQuantity = (type) => {
		if (type === 'decrease') {
			if (qty === 1) {
				setQty(1);
			} else {
				setQty(qty - 1);
				setAlert(false);
			}
		} else if (type === 'increase') {
			if (qty === product.quantity) {
				setQty(product.quantity);
				setAlert(true);
			} else {
				setQty(qty + 1);
			}
		}
	};

	if (loading) return <Loading />;
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
								<Zoom key={index} zoomMargin={40}>
									<img alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="h-full w-full object-cover" />
								</Zoom>
							))}
					</div>
				</div>

				{/* ========= right size ========= */}
				<div className="sticky top-8 w-2/6 lg:w-1/2 md:w-full h-full transition-all">
					<div className="mb-8 space-y-8">
						<div>
							<h1 className="text-3xl text-black font-bold">{product.name}</h1>
							<p className="mb-3 text-base text-black/80 font-medium">{product.category.name}</p>
							<p>${product.price}</p>
						</div>

						<ImageSection product={product} currentImage={currentImage} handleChangeSlide={handleChangeSlide} />
						<ColorSection product={product} size={size} setSize={setSize} />
						<ColorSection product={product} color={color} setColor={setColor} />
						{product.quantity !== 0 && (
							<div className="flex flex-col">
								<span className="text-sm mb-4">Quantity: {product.quantity}</span>
								<div className="flex items-center">
									<span onClick={() => handleUpdateQuantity('decrease')} className="quantity-button">
										-
									</span>
									<span className="w-8 text-sm text-center">{qty}</span>
									<span onClick={() => handleUpdateQuantity('increase')} className="quantity-button">
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

						<div className="grid grid-cols-4 gap-3">
							<button className="col-span-3 w-full h-14 text-sm font-medium uppercase border border-black bg-black text-white rounded-md">Add to bag</button>
							<button className="col-span-1 w-full h-14 flex items-center justify-center border border-gray-300 bg-white text-black/50 rounded-md">
								<BsHeart className="text-xl" />
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
