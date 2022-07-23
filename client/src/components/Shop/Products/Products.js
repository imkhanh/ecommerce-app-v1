import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';
import ProductItem from './ProductItem';
import ProductMenu from './ProductMenu';
import { getDataApi } from '../Api/FetchData';
import Loading from '../Layout/Loading';

export const ProductContext = createContext();

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	useEffect(() => {
		window.document.title = 'Products';
	}, []);

	useEffect(() => {
		const fetchAllProduct = async () => {
			try {
				dispatch({ type: 'loading', payload: true });
				const res = await getDataApi('/all-product');
				dispatch({ type: 'products', payload: res.data.products });
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllProduct();
		// eslint-disable-next-line
	}, []);

	return (
		<section className="max-w-[89rem] mx-auto w-full p-12 lg:p-8 md:px-4 space-y-8 transition-all">
			<ProductMenu />
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-2 gap-y-12">{products && products.length > 0 ? products.map((product) => <ProductItem key={product._id} product={product} />) : <div>{loading && <Loading />}</div>}</div>
		</section>
	);
};

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductContext.Provider>
	);
};

export default Products;
