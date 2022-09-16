import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { getSingleProduct } from './FetchData';
import Loading from '../Utils/Loading';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, loading } = state;

	const [currentImage, setCurrentImage] = useState(0);

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
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <Loading />;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="p-8 lg:p-4 max-w-7xl mx-auto w-full bg-white">
			<div className="mb-8">Menu</div>

			<div className="grid grid-cols-3 md:grid-cols-1 gap-12 lg:gap-6">
				<div className="col-span-2">
					<div className="hidden md:block relative">
						<img
							alt={product.name}
							className="w-full h-full object-cover"
							src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
						/>
						<span className="absolute left-4 bottom-4 bg-white z-10 max-w-[60px] w-full h-5 flex items-center justify-between shadow-md border border-gray-50 rounded-full">{currentImage + 1} / {product.images.lengt}</span>
					</div>

					<div className="md:hidden grid grid-cols-2 gap-2">
						{product.images.length > 0 &&
							product.images.map((img) => {
								return <img alt={product.name} className="w-22 h-22 object-cover" src={`http://localhost:3000/uploads/products/${img}`} />;
							})}
					</div>
				</div>
				<div>{product.name}</div>
			</div>
		</section>
	);
};
export default SingleProductSection;
