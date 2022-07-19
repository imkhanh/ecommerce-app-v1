import React, { createContext, useEffect, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { productReducer, productState } from './ProductContext';

export const ProductContext = createContext();

const ProductSection = () => {
	useEffect(() => {
		window.document.title = 'Products';
	}, []);

	return (
		<section>
			<div>1</div>
			<div>2</div>
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
