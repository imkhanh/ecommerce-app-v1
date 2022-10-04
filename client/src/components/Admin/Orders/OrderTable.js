import React, { useContext, useEffect } from 'react';
import { deleteOrder, getAllOrders } from './FetchApi';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { OrderContext } from '.';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';
import { BASE_URL } from '../../../url';

const OrderTable = () => {
	const { state, dispatch } = useContext(OrderContext);
	const { orders, loading } = state;

	useEffect(() => {
		fetchAllOrders();
		// eslint-disable-next-line
	}, []);

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

	const handleDeleteOrder = async (id) => {
		try {
			const res = await deleteOrder(id);
			if (res && res.data.success) {
				fetchAllOrders();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditOrder = (id, order) => {
		dispatch({ type: 'editOrderOpen', payload: { id, ...order } });
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-4 bg-white overflow-x-auto border border-gray-200 rounded-sm shadow-lg">
			<table className="min-w-full text-sm divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="pl-4 py-2 text-left text-xs font-medium text-black">Products</th>
						<th className="py-2 text-left text-xs font-medium text-black">Status</th>
						<th className="py-2 text-left text-xs font-medium text-black">Total</th>
						<th className="py-2 text-left text-xs font-medium text-black">Phone</th>
						<th className="py-2 text-left text-xs font-medium text-black">Address</th>
						<th className="py-2 text-left text-xs font-medium text-black">Transaction Id</th>
						<th className="py-2 text-left text-xs font-medium text-black">Checkout At</th>
						<th className="py-2 text-left text-xs font-medium text-black">Processing</th>
						<th className="py-2 font-medium text-left text-black">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{orders.length > 0 ? (
						orders.map((order) => {
							return (
								<tr key={order._id}>
									<td className="pt-2 pb-4 pr-4 divide-y divide-black/10">
										{order.products.map((product, index) => {
											return (
												<span key={product._id} className="flex items-center">
													<img
														className="w-12 h-12 object-cover"
														src={`${BASE_URL}/uploads/products/${product.id.images[0]}`}
														alt="productImage"
													/>
													<span className="pl-4 flex flex-col">
														<span className="text-xs text-black/50">{product.id.name}</span>
														<span className="text-xs text-black/50">x{product.quantity}</span>
													</span>
												</span>
											);
										})}
									</td>
									<td className="py-4">
										<span
											className={`rounded-full text-xs py-2 px-3 font-medium ${
												order.status === 'Not processed'
													? 'text-red-700 bg-red-100'
													: order.status === 'Processing'
													? 'text-yellow-700 bg-yellow-100'
													: order.status === 'Shipped'
													? 'text-purple-700 bg-purple-100'
													: order.status === 'Delivered'
													? 'text-green-700 bg-green-100'
													: order.status === 'Cancelled' && 'text-red-700 bg-red-100'
											} `}
										>
											{order.status}
										</span>
									</td>
									<td className="py-2 text-black/60">${order.amount}.00</td>
									<td className="py-2 text-black/60">{order.phoneNumber}</td>
									<td className="py-2 text-black/60">{order.address}</td>
									<td className="py-2 text-black/60">{order.transactionId}</td>
									<td className="py-2 text-black/60">{dayjs(order.createdAt).format('DD/MM/YYYY')}</td>
									<td className="py-2 text-black/60 ">{dayjs(order.updatedAt).format('DD/MM/YYYY')}</td>
									<td className="py-2 text-black/70">
										<div className="flex items-center space-x-4">
											<span
												onClick={() => handleEditOrder(order._id, order)}
												className="cursor-pointer select-none hover:text-amber-500"
											>
												<BsPencilFill />
											</span>
											<span
												onClick={() => handleDeleteOrder(order._id)}
												className="cursor-pointer select-none hover:text-red-500"
											>
												<BsTrashFill />
											</span>
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td className="py-2 px-4 text-black/50 italic font-light">No order found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
