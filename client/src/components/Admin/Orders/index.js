import React, { createContext, useReducer } from 'react';
import OrderMenu from './OrderMenu';
import OrderTable from './OrderTable';
import { orderReducer, orderState } from './OrderContext';
import Layout from '../Layout';

export const OrderContext = createContext();

const OrderSection = () => {
	return (
		<section className="p-8">
			<OrderMenu />
			<OrderTable />
		</section>
	);
};

const Orders = () => {
	const [state, dispatch] = useReducer(orderReducer, orderState);

	return (
		<OrderContext.Provider value={{ state, dispatch }}>
			<Layout children={<OrderSection />} />
		</OrderContext.Provider>
	);
};

export default Orders;
