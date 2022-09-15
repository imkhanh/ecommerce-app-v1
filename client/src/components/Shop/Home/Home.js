import React, { createContext, useReducer } from 'react';
import { homeReducer, homeState } from './HomeContext';
import Layout from '../Layout/Layout';

export const HomeContext = createContext();

const Home = () => {
	const [state, dispatch] = useReducer(homeReducer, homeState);
	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<div>Home Section</div>} />
		</HomeContext.Provider>
	);
};
export default Home;
