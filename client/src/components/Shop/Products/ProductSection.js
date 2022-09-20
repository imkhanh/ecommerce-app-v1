import React, { useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

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
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="py-12 max-w-6xl mx-auto w-full">
			<div className="mt-8">
				<div className="py-4 px-6 flex items-center justify-between">
					<div>
						<Link to="/">Home</Link>
						<span>/</span>
						<Link to="/">Shop</Link>
					</div>
					<div>Filter</div>
				</div>
				<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 duration-200 ease-in-out">
					{loading ? (
						<div>Loading</div>
					) : products.length > 0 ? (
						products.map((product) => <ProductItem key={product._id} product={product} />)
					) : (
						<div></div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProductSection;
