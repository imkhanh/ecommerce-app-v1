import React, { useContext } from 'react';
import { LayoutContext } from '..';

const OrderSuccess = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div
			onClick={() => dispatch({ type: 'orderSuccess', payload: false })}
			className={`${
				state.orderSuccess ? '' : 'hidden'
			} fixed bottom-0 h-[50vh] w-full left-0 bg-gray-900 flex items-center justify-center`}
		>
			<div className="text-lg text-white">Your Order in process. Wait 2 days to deliver.</div>
			<div
				onClick={() => dispatch({ type: 'orderSuccess', payload: false })}
				className="absolute top-4 right-4 cursor-pointer text-white select-none"
			>
				close
			</div>
		</div>
	);
};

export default OrderSuccess;
