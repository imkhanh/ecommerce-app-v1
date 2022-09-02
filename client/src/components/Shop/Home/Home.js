import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { homeReducer, homeState } from './HomeContext';

export const HomeContext = createContext();

const HomeSection = () => {
	return <div>HomeSection</div>;
};

const Home = () => {
	const [state, dispatch] = useReducer(homeReducer, homeState);

	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<HomeSection />} />
		</HomeContext.Provider>
	);
};

export default Home;
