import React, { createContext, useReducer } from 'react';
import Layout from '../Layout';
import Featured from './Featured';
import { homeReducer, homeState } from './HomContext';
import OrderSuccess from './OrderSuccess';
import Sliders from './Sliders';
import Slogan from './Slogan';

export const HomeContext = createContext();

const HomeSection = () => {
	return (
		<section>
			<Sliders />
			<Slogan />
			<Featured />
			<OrderSuccess />
		</section>
	);
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
