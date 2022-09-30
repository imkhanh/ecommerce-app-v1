import React, { useContext, useEffect } from 'react';
import { ProductsContext } from './';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';
import ProductSidebar from './ProductSidebar';
import Loading from '../Common/Loading';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line
	}, []);

	const fetchProducts = () => {
		dispatch({ type: 'loading', payload: true });

		getAllProducts()
			.then((res) => {
				dispatch({ type: 'products', payload: res.data.products });
				dispatch({ type: 'loading', payload: false });
			})
			.catch((err) => console.log(err));
	};

	return (
		<section>
			<ProductSidebar />
			<div>
				<div className="py-4 px-8 lg:px-4 flex items-center justify-between">
					<div>{products.length} products</div>
					<div
						onClick={() => dispatch({ type: 'sideBarToggle', payload: true })}
						className="cursor-pointer select-none"
					>
						Filters
					</div>
				</div>
				<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 border-t border-l border-black/10">
					{loading ? (
						<Loading />
					) : products.length > 0 ? (
						products.map((product) => {
							return <ProductItem key={product._id} product={product} />;
						})
					) : (
						<div>No product found</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProductSection;
