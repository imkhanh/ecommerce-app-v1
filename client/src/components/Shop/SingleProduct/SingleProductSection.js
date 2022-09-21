import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '..';
import ProductHeader from './ProductHeader';
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
		<section>
			<ProductHeader />
			<div className="flex border-t border-l divide-x divide-black/10 border-black/10">
				<div className="w-1/2">
					<div>1</div>
					<div>2</div>
				</div>
				<div className="w-1/2">Info</div>
			</div>
		</section>
	);
};

export default SingleProductSection;
