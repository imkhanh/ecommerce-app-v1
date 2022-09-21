import React, { useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';
import ListProductRender from './ListProductRender';
import ProductHeader from './ProductHeader';
import Pagination from './Pagination';
import OrderComponent from './OrderComponent';

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
			setTimeout(() => {
				if (res && res.data.products) {
					dispatch({ type: 'products', payload: res.data.products });
					dispatch({ type: 'loading', payload: false });
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	// if (loading) return <Loading />;

	return (
		<section>
			<ProductHeader />

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 duration-200 ease-in-out border-t border-l border-black/10">
				<div className="md:absolute md:top-1/2 md:transform md:-translate-y-1/2 col-span-2 row-span-2 lg:col-span-1 lg:row-span-1 border-b border-r border-black/10">
					<h1 className="h-full pl-24 xl:pl-20 lg:pl-8 text-7xl xl:text-5xl lg:text-3xl font-semibold flex items-center justify-start duration-200 ease-in-out">
						All Products
					</h1>
				</div>

				{loading ? (
					<ListProductRender count={8} />
				) : products.length > 0 ? (
					products.map((product) => <ProductItem key={product._id} product={product} />)
				) : (
					<div className="text-sm font-light italic text-gray-400">No product found</div>
				)}
			</div>

			<Pagination />

			<OrderComponent />
		</section>
	);
};

export default ProductSection;
