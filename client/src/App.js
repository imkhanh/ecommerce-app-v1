import React, { useReducer } from 'react';
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutState, layoutReducer } from './components/Shop/Layout/LayoutContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './components/Shop/Home/Home';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);
	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</LayoutContext.Provider>
	);
};

export default App;
