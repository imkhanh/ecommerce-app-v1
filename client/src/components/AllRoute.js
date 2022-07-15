import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../components/Shop/Home/Home';

const AllRoute = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AllRoute;
