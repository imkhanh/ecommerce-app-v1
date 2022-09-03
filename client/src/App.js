import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutState, layoutReducer } from './components/Shop/Layout/LayoutContext';

// shop routes
import { Home, Products } from './components/Shop';
// manager routes

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
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
