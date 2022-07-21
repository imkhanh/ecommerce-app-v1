import React, { createContext, useEffect, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { productReducer, productState } from './ProductContext';
import ProductItem from './ProductItem';
import ProductMenu from './ProductMenu';

export const ProductContext = createContext();

const ProductSection = () => {
	useEffect(() => {
		window.document.title = 'Products';
	}, []);

	return (
		<section className="max-w-[80rem] w-full mx-auto p-12 lg:p-8 md:p-4 space-y-12 lg:space-y-8 md:space-y-4 transition-all">
			<ProductMenu />
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
			</div>
		</section>
	);
};

const Products = () => {
	const [data, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ data, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductContext.Provider>
	);
};

export default Products;
