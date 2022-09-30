import React, { createContext, useReducer } from 'react';
import ProductMenu from './ProductMenu';
import ProductTable from './ProductTable';
import { productsReducer, productsState } from './ProductContext';
import Layout from '../Layout';

export const ProductsContext = createContext();

const ProductSection = () => {
	return (
		<section className="p-8">
			<ProductMenu />
			<ProductTable />
		</section>
	);
};

const Products = () => {
	const [state, dispatch] = useReducer(productsReducer, productsState);

	return (
		<ProductsContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductsContext.Provider>
	);
};

export default Products;
