import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from './components/Shop/AuthModal/RequireAuth';
import RequireAdmin from './components/Shop/AuthModal/RequireAdmin';
//shop routes
import { LayoutContext, layoutReducer, layoutState, Home, Product, Products } from './components/Shop';

//manager routes
import { Dashboard, AdminProducts, AdminCategories, AdminUsers } from './components/Admin';

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
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/products" element={<AdminProducts />} />
						<Route path="/admin/categories" element={<AdminCategories />} />
						<Route path="/admin/users" element={<AdminUsers />} />
						<Route path="/admin/orders" element={<AdminProducts />} />
					</Route>

					<Route path="*" element={<div>Page not found</div>} />
					<Route path="/404" element={<div>Page not found</div>} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
