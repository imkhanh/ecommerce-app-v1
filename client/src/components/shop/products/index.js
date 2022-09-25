import React, { createContext, useReducer } from 'react';
import ProductSection from './ProductSection';
import { productsReducer, productsState } from './ProductContext';
import { Layout } from '..';

export const ProductsContext = createContext();

const Products = () => {
	const [state, dispatch] = useReducer(productsReducer, productsState);

	return (
		<ProductsContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductsContext.Provider>
	);
};

export default Products;
