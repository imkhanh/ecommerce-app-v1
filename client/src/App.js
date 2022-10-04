import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from './components/Shop/AuthModal/RequireAuth';
import RequireAdmin from './components/Shop/AuthModal/RequireAdmin';
//shop routes
import {
	LayoutContext,
	layoutReducer,
	layoutState,
	Home,
	Product,
	Products,
	Checkout,
	UserProfile,
	UserOrder,
	UserWishList,
	ChangePassword,
	PageNotFound,
} from './components/Shop';

//manager routes
import { Dashboard, AdminProducts, AdminCategories, AdminUsers, AdminOrder } from './components/Admin';

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
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/user/profile" element={<UserProfile />} />
						<Route path="/user/order-list" element={<UserOrder />} />
						<Route path="/user/wish-list" element={<UserWishList />} />
						<Route path="/user/change-password" element={<ChangePassword />} />
					</Route>

					<Route element={<RequireAdmin />}>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/products" element={<AdminProducts />} />
						<Route path="/admin/categories" element={<AdminCategories />} />
						<Route path="/admin/users" element={<AdminUsers />} />
						<Route path="/admin/orders" element={<AdminOrder />} />
					</Route>

					<Route path="*" element={<PageNotFound />} />
					<Route path="/404" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;
