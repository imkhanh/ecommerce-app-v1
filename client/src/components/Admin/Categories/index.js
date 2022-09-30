import React, { createContext, useReducer } from 'react';
import Layout from '../Layout';
import CategoryMenu from './CategoryMenu';
import CategoryTable from './CategoryTable';
import { categoryReducer, categoryState } from './CategoryContext';

export const CategoryContext = createContext();

const CategoryComponent = () => {
	return (
		<section className="p-8">
			<CategoryMenu />
			<CategoryTable />
		</section>
	);
};

const Categories = () => {
	const [state, dispatch] = useReducer(categoryReducer, categoryState);

	return (
		<CategoryContext.Provider value={{ state, dispatch }}>
			<Layout children={<CategoryComponent />} />;
		</CategoryContext.Provider>
	);
};

export default Categories;
