import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '.';
import Overlay from '../Layout/Overlay';
import { updateOrder, getAllOrders } from './FetchApi';

const EditOrder = () => {
	const { state, dispatch } = useContext(OrderContext);
	const [data, setData] = useState({
		id: '',
		status: '',
		success: '',
		error: '',
	});

	useEffect(() => {
		setData({
			id: state.editOrder.id,
			status: state.editOrder.status,
		});

		// eslint-disable-next-line
	}, [state.editOrder.modal]);

	const fetchAllOrders = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllOrders();
			dispatch({ type: 'orders', payload: res.data.orders });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let orderData = {
			id: data.id,
			status: data.status,
		};

		try {
			const res = await updateOrder(orderData);
			if (res && res.data.success) {
				fetchAllOrders();
				dispatch({ type: 'editOrderClose', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, id: '', status: '', success: false, error: false });
		}, 2000);
	}

	return (
		<div className="relative">
			<Overlay state={state.editOrder.modal} dispatch={() => dispatch({ type: 'editOrderClose', payload: false })} />
			<div
				className={`${
					state.editOrder.modal ? '' : 'hidden'
				} bg-white fixed top-12 left-1/2 transform -translate-x-1/2 max-w-lg w-full h-auto rounded-sm z-[70]`}
			>
				<div className="h-14 flex items-center justify-center">
					<h2 className="font-semibold text-lg uppercase">Edit Order</h2>
				</div>

				{data.success && <div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{data.success}</div>}
				{data.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{data.error}</div>}

				<form onSubmit={handleSubmit} className="pt-4 pb-8 px-12 space-y-4">
					<div className="space-y-1">
						<span className="text-sm">Order Status</span>
						<select
							name="status"
							value={data.status}
							onChange={(e) => setData({ ...data, success: false, error: false, status: e.target.value })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						>
							<option disabled value="">
								Select status
							</option>

							<option name="status" value="Not processed">
								Not processed
							</option>
							<option name="status" value="Processing">
								Processing
							</option>
							<option name="status" value="Shipped">
								Shipped
							</option>
							<option name="status" value="Delivered">
								Delivered
							</option>
							<option name="status" value="Cancelled">
								Cancelled
							</option>
						</select>
					</div>
					<button className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">
						Edit Order
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditOrder;
