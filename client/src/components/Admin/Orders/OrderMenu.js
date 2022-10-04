import React, { useContext } from 'react';
import { OrderContext } from '.';
import EditOrder from './EditOrder';

const OrderMenu = () => {
	const { state } = useContext(OrderContext);

	return (
		<>
			<div className="h-16 flex items-center justify-between">
				<div>
					<p className="text-sm font-light text-black/50">Have {state.orders && state.orders.length} orders</p>
				</div>
			</div>
			<EditOrder />
		</>
	);
};

export default OrderMenu;
