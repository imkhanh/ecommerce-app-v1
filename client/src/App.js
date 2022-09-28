import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LayoutContext, layoutReducer, layoutState, Home, Product, Products } from './components/Shop';
import RequireAuth from './components/Shop/AuthModal/RequireAuth';
import RequireAdmin from './components/Shop/AuthModal/RequireAdmin';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Products />} />
					<Route path="/shop/product-detail/:id" element={<Product />} />

					<Route element={<RequireAuth />}>
						<Route path="/user/profile" element={<div>Profile</div>} />
					</Route>

					<Route element={<RequireAdmin />}>
						<Route path="/admin/dashboard" element={<div>dashboard</div>} />
						<Route path="/admin/products" element={<div>products</div>} />
						<Route path="/admin/categories" element={<div>categories</div>} />
						<Route path="/admin/users" element={<div>users</div>} />
						<Route path="/admin/orders" element={<div>orders</div>} />
					</Route>

					<Route path="*" element={<div>Page not found</div>} />
					<Route path="/404" element={<div>Page not found</div>} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
