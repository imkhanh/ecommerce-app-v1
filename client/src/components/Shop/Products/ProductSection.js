import React, { useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';
import ProductHeader from './ProductHeader';
import LoadingListRender from '../Utils/LoadingListRender';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchAllProducts();
		// eslint-disable-next-line
	}, []);

	const fetchAllProducts = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProducts();
			if (res && res.data.products) {
				dispatch({ type: 'products', payload: res.data.products });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section>
			<ProductHeader />

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{loading ? (
					<LoadingListRender count={8} />
				) : products.length > 0 ? (
					products.map((product) => <ProductItem key={product._id} product={product} />)
				) : (
					<div className="text-sm font-light italic text-gray-400">No product found</div>
				)}
			</div>
		</section>
	);
};

export default ProductSection;
