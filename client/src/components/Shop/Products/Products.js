import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import ProductSection from './ProductSection';
import Layout from '../Layout/Layout';

export const ProductContext = createContext();

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);
	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductContext.Provider>
	);
};

export default Products;
