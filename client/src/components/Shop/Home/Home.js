import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';

export const HomeContext = createContext();

const HomeSection = () => {
	return <section>HomeSection</section>;
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
