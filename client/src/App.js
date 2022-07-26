import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';

import { Home, Products, SingleProduct } from './components/Shop';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/detail/:id" element={<SingleProduct />} />

					<Route path="*" element={<div>Page Not Found</div>} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
