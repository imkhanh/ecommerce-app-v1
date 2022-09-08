import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import ProductSection from './ProductSection';

export const ProductContext = createContext();

const productState = {
	products: [],
	loading: false,
};

const productReducer = (state = productState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
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
