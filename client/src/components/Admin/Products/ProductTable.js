import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '.';
import { getAllProducts, deleteProduct } from './FetchApi';
import { BsPencil, BsXLg } from 'react-icons/bs';
import dayjs from 'dayjs';

const ProductTable = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchAllProducts();
		// eslint-disable-next-line
	}, []);

	const fetchAllProducts = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProducts();
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteProduct = async (id) => {
		try {
			const res = await deleteProduct(id);
			if (res && res.data.success) {
				fetchAllProducts();
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleEditProduct = (id, product) => {
		dispatch({ type: 'editProductOpen', payload: { id, ...product } });
	};

	if (loading) return <div>Loading</div>;

	return (
		<div className="px-4">
			<div className="mb-4">
				<p className="text-sm font-light text-black/50">Have {products.length} products</p>
			</div>

			<div className="bg-white overflow-x-auto border border-gray-200 rounded-sm shadow-lg">
				<table className="min-w-full text-sm divide-y divide-gray-200">
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
												alt={product.name}
												className="w-16 h-16 object-cover"
												src={`http://localhost:3000/uploads/products/${product.images[0]}`}
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
												className={`py-[6px] px-4 rounded-full border border-black/10 text-xs font-medium cursor-pointer select-none ${
													product.status === 'New'
														? 'border-black/10 text-black bg-white'
														: product.status === 'Pre Order'
														? 'border-gray-50 text-gray-500 bg-gray-200'
														: product.status === 'Sold Out'
														? 'border-red-100 text-red-700 bg-red-100'
														: product.status === 'Sale' && 'bg-amber-100 text-amber-800 border-amber-100'
												}`}
											>
												{product.status}
											</span>
										</td>
										<td className="py-2 text-black/70">{dayjs(product.createdAt).format('DD/MM/YYYY')}</td>
										<td className="py-2 text-black/70">{dayjs(product.updatedAt).format('DD/MM/YYYY')}</td>
										<td className="py-2 text-black/70">
											<div className="flex items-center space-x-2">
												<span
													onClick={() => handleEditProduct(product._id, product)}
													className="py-2 px-4 flex items-center justify-center bg-amber-100 text-amber-700 rounded-md cursor-pointer select-none"
												>
													<BsPencil />
												</span>
												<span
													onClick={() => handleDeleteProduct(product._id)}
													className="py-2 px-4 flex items-center justify-center bg-red-500 text-white rounded-md cursor-pointer select-none"
												>
													<BsXLg />
												</span>
											</div>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="py-2 px-4 text-black/50 italic font-light">No product found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductTable;
