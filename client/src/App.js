import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//shop routes
import { LayoutContext, layouteReducer, layouteState, Home, Shop, SingleProduct } from './components/Shop';
//manager routes

const App = () => {
	const [state, dispatch] = useReducer(layouteReducer, layouteState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/shop/product-detail/:id" element={<SingleProduct />} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
