import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from './';
import { getAllProducts } from './FetchApi';
import Loading from '../layout/Loading';
import ProductItem from './ProductItem';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductsContext);
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
			<div className="py-4 px-8 lg:px-4 border-t-0 border-b border-black/10 flex items-center justify-between">
				<div className="flex items-center text-sm space-x-2 text-black/50">
					<Link to="/">Home</Link>
					<span>/</span>
					<Link to="/">Shop</Link>
				</div>
				<div className="flex items-center space-x-8">
					<select className="w-32 cursor-pointer outline-none text-sm text-black/50 hover:text-black">
						<option>Collections</option>
						<option>All</option>
						<option>Men</option>
						<option>Women</option>
					</select>
					<select className="w-32 cursor-pointer outline-none text-sm text-black/50 hover:text-black">
						<option>Sort</option>
						<option>All</option>
						<option>Men</option>
						<option>Women</option>
					</select>
				</div>
			</div>
			<div className="hidden py-14 border-b md:flex items-center justify-center">
				<h1 className="h-full text-3xl font-semibold ">All Products</h1>
			</div>

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{loading ? (
					<Loading />
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
