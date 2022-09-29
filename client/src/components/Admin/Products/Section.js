import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '.';
import { getAllProducts } from './FetchApi';
import Menu from './Menu';
import dayjs from 'dayjs';

const Section = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchAllProducts();
		// eslint-disable-next-line
	}, []);

	const fetchAllProducts = () => {
		dispatch({ type: 'loading', payload: true });

		getAllProducts().then((res) => {
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		});
	};

	if (loading) return <div>Loading</div>;

	return (
		<section className="px-4">
			<Menu />
			<div>
				<div className="mb-4">
					<p className="text-sm font-light text-black/50">Have {products.length} products</p>
				</div>
				<div className="bg-white overflow-x-auto border border-gray-100 rounded shadow-lg">
					<table className="w-full text-sm divide-y divide-gray-200">
						<thead>
							<tr>
								<th className="pl-4 py-2 font-medium text-left text-black">Image</th>
								<th className="py-2 font-medium text-left text-black">Name</th>
								<th className="py-2 font-medium text-left text-black">Description</th>
								<th className="py-2 font-medium text-left text-black">Category</th>
								<th className="py-2 font-medium text-left text-black">Brand</th>
								<th className="py-2 font-medium text-left text-black">Quantity</th>
								<th className="py-2 font-medium text-left text-black">Offer (%)</th>
								<th className="py-2 font-medium text-left text-black">Price ($)</th>
								<th className="py-2 font-medium text-left text-black">Status</th>
								<th className="py-2 font-medium text-left text-black">Created At</th>
								<th className="py-2 font-medium text-left text-black">Updated At</th>
								<th className="py-2 font-medium text-left text-black">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{products.length > 0 ? (
								products.map((product) => {
									return (
										<tr key={product._id}>
											<td className="py-2 font-medium">
												<img
													src={`http://localhost:3000/uploads/products/${product.images[0]}`}
													alt={product.name}
													className="w-14 h-14 object-cover"
												/>
											</td>
											<td className="py-2 text-black/70">{product.name}</td>
											<td className="py-2 text-black/70">
												{product.description.length < 20
													? product.description
													: product.description.slice(0, 20) + '...'}
											</td>
											<td className="py-2 text-black/70">{product.category.name}</td>
											<td className="py-2 text-black/70">{product.brand}</td>
											<td className="py-2 text-black/70">{product.quantity}</td>
											<td className="py-2 text-black/70">{product.offer}</td>
											<td className="py-2 text-black/70">{product.price}</td>
											<td className="py-2">
												<span
													className={`py-[6px] px-4 rounded-full border border-black/10 text-xs font-semibold cursor-pointer select-none ${
														product.status === 'New'
															? 'border-black/10 text-black bg-white'
															: product.status === 'Pre Order'
															? 'border-gray-50 text-gray-500 bg-gray-200'
															: product.status === 'Sold Out'
															? 'border-red-100 text-red-700 bg-red-100'
															: product.status === 'Sale' &&
															  'bg-amber-100 text-amber-800 border-amber-100'
													}`}
												>
													{product.status}
												</span>
											</td>
											<td className="py-2 text-black/70">{dayjs(product.createdAt).format('DD/MM/YYYY')}</td>
											<td className="py-2 text-black/70">{dayjs(product.updatedAt).format('DD/MM/YYYY')}</td>
											<td className="py-2 text-black/70">
												<div>X</div>
												<div>X</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td>No product found</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Section;
