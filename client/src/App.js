import React, { useReducer } from 'react';
import AllRoute from './components/AllRoute';
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';

const App = () => {
	const [data, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ data, dispatch }}>
			<AllRoute />
		</LayoutContext.Provider>
	);
};

export default App;
