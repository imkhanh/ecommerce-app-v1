import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import ProductSection from './ProductSection';
import { productReducer, productState } from './ProductContext';

export const ProductContext = createContext();

const Products = () => {
	const { state, dispatch } = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductContext.Provider>
	);
};

export default Products;
