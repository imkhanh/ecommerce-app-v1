import React, { useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProducts, getAllCategories } from './FetchData';
import ProductItem from './ProductItem';
import Loading from '../Utils/Loading';
import ProductMenu from './ProductMenu';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchData();
		fetchCategoriesData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProducts();
			setTimeout(() => {
				dispatch({ type: 'products', payload: res.data.products });
				dispatch({ type: 'loading', payload: false });
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchCategoriesData = async () => {
		try {
			const res = await getAllCategories();
			dispatch({ type: 'categories', payload: res.data.categories });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="p-8 lg:p-4 max-w-7xl mx-auto w-full">
			<ProductMenu />

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 duration-300 ease-in-out">
				{loading ? (
					<Loading />
				) : products && products.length > 0 ? (
					products.map((product) => {
						return <ProductItem key={product._id} product={product} />;
					})
				) : (
					<div>
						<p className="italic text-black/50">No product found</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductSection;
