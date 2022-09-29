import React, { createContext, useReducer } from 'react';
import Layout from '../Layout';
import Section from './Section';

export const ProductsContext = createContext();

const productsState = {
	products: [],
	addProduct: false,
	loading: false,
};

const productsReducer = (state = productsState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'addProduct':
			return { ...state, addProduct: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

const Products = () => {
	const [state, dispatch] = useReducer(productsReducer, productsState);
	return (
		<ProductsContext.Provider value={{ state, dispatch }}>
			<Layout children={<Section />} />
		</ProductsContext.Provider>
	);
};

export default Products;
