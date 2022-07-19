import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';

import { Home, Products } from './components/Shop';

const App = () => {
	const [data, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ data, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
