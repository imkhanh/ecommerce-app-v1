import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '..';
import { getSingleProduct } from './FetchApi';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, loading } = state;

	useEffect(() => {
		fetchAllProducts();
		// eslint-disable-next-line
	}, []);

	const fetchAllProducts = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <div>Loading</div>;
	} else if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<section className="px-8 md:px-4 max-w-6xl mx-auto w-full">
			<div>SingleProductMenu</div>
			<div className="flex">
				<div>
					<div></div>
					<div></div>
				</div>
				<div>Info</div>
			</div>
		</section>
	);
};

export default SingleProductSection;
