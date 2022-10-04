import React, { useContext, useEffect } from 'react';
import DashboardLayout, { DashboardContext } from '.';
import { getOrderByUser } from './FetchApi';
import Loading from '../Common/Loading';
import dayjs from 'dayjs';

const UserOrderSection = () => {
	const uId = JSON.parse(localStorage.getItem('auth')).user.id;
	const { state, dispatch } = useContext(DashboardContext);
	const { orderByUser: orders, loading } = state;

	useEffect(() => {
		fetchOrderByUser();
		// eslint-disable-next-line
	}, []);

	const fetchOrderByUser = async () => {
		// dispatch({ type: 'loading', payload: true });

		try {
			const res = await getOrderByUser(uId);
			dispatch({ type: 'orderByUser', payload: res.data.order });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="px-8 pb-8 border-t-2 border-black shadow">
			<div className="mb-4 h-20 flex flex-col items-start justify-center border-b border-black/10">
				<h4 className="text-base font-semibold">My Order List</h4>
				<p className="text-sm text-black/70">Total {orders && orders.length} orders</p>
			</div>
			<div className="mt-4 bg-white overflow-x-auto rounded-sm">
				<table className="min-w-full text-sm divide-y divide-gray-200">
					<thead>
						<tr>
							<th className="py-2 text-left text-xs font-medium text-black">Products</th>
							<th className="py-2 text-left text-xs font-medium text-black">Status</th>
							<th className="py-2 text-left text-xs font-medium text-black">Total</th>
							<th className="py-2 text-left text-xs font-medium text-black">Phone</th>
							<th className="py-2 text-left text-xs font-medium text-black">Address</th>
							<th className="py-2 text-left text-xs font-medium text-black">Transaction Id</th>
							<th className="py-2 text-left text-xs font-medium text-black">Checkout At</th>
							<th className="py-2 text-left text-xs font-medium text-black">Processing</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{orders && orders.length > 0 ? (
							orders.map((order) => {
								return (
									<tr key={order._id}>
										<td className="py-4 pr-4 divide-y divide-black/10">
											{order.products.map((product, index) => {
												return (
													<span key={product._id} className="flex items-center">
														<img
															className="w-12 h-12 object-cover"
															src={`http://localhost:3000/uploads/products/${product.id.images[0]}`}
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
									</tr>
								);
							})
						) : (
							<tr>
								<td className="py-6 text-black/50 italic font-light">No product found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const UserOrder = () => {
	return <DashboardLayout children={<UserOrderSection />} />;
};

export default UserOrder;
