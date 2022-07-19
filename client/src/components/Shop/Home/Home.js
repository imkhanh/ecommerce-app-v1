import React, { useEffect, createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { homeReducer, homeState } from './HomeContext';

export const HomeContext = createContext();

const HomeComponent = () => {
	useEffect(() => {
		window.document.title = 'Home';
	}, []);

	return <div>HomeComponent</div>;
};

const Home = () => {
	const [data, dispatch] = useReducer(homeReducer, homeState);
	return (
		<HomeContext.Provider value={{ data, dispatch }}>
			<Layout children={<HomeComponent />} />
		</HomeContext.Provider>
	);
};

export default Home;
