import React, { createContext, useReducer } from 'react';
import { homeReducer, homeState } from './HomeContext';
import Layout from '../Layout/Layout';

export const HomeContext = createContext();

export const Home = () => {
	const [state, dispatch] = useReducer(homeReducer, homeState);

	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<div className="h-[2000px]">Home</div>} />
		</HomeContext.Provider>
	);
};
