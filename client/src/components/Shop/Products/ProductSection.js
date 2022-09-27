import React, { useContext, useEffect } from 'react';
import { ProductsContext } from './';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line
	}, []);

	const fetchProducts = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllProducts();
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section>
			<div className="py-4 px-8 lg:px-4 flex items-center justify-between">
				<div>1</div>
				<div>2</div>
			</div>
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 border-t border-l border-black/10">
				{loading ? (
					<div>Loading</div>
				) : products.length > 0 ? (
					products.map((product) => {
						return <ProductItem key={product._id} product={product} />;
					})
				) : (
					<div>No product found</div>
				)}
			</div>
		</section>
	);
};

export default ProductSection;
