import React, { createContext, useReducer } from 'react';
import Layout from '../Layout';
import OrderSuccess from './OrderSuccess';
export const HomeContext = createContext();

const HomeSection = () => {
	return (
		<section>
			<div></div>
			<OrderSuccess />
		</section>
	);
};

const Home = () => {
	const [state, dispatch] = useReducer();
	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<HomeSection />} />
		</HomeContext.Provider>
	);
};

export default Home;
