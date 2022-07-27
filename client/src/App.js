import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';

import { Home, Products, SingleProduct, PageNotFound, RequiredAdmin, RequiredAuth } from './components/Shop';
import { Dashboard, AdminProducts } from './components/Admin';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/detail/:id" element={<SingleProduct />} />

					<Route element={<RequiredAuth />}></Route>

					<Route element={<RequiredAdmin />}>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/products" element={<AdminProducts />} />
					</Route>

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
