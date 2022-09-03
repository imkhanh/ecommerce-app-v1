import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { homeReducer, homeState } from './HomeContext';
import HomeSection from './HomeSection';

export const HomeContext = createContext();

const Home = () => {
	const [state, dispatch] = useReducer(homeReducer, homeState);

	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<HomeSection />} />
		</HomeContext.Provider>
	);
};

export default Home;
