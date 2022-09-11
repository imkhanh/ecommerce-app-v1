import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { layoutState, layoutReducer, LayoutContext, Home, Products, SingleProduct } from './components/Shop';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);
	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Products />} />
					<Route path="/product/detail" element={<SingleProduct />} />
				</Routes>
			</Router>
		</LayoutContext.Provider>
	);
};

export default App;
