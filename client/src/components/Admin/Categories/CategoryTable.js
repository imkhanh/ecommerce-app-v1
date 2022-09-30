import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '.';
import { getAllCategories, deleteProduct } from './FetchApi';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';

const CategoryTable = () => {
	const { state, dispatch } = useContext(CategoryContext);
	const { categories, loading } = state;

	useEffect(() => {
		fetchAllCategories();
		// eslint-disable-next-line
	}, []);

	const fetchAllCategories = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllCategories();
			dispatch({ type: 'categories', payload: res.data.categories });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteCategory = async (id) => {
		try {
			const res = await deleteProduct(id);
			if (res && res.data.success) {
				fetchAllCategories();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditCategory = (id, name, description, status) => {
		dispatch({ type: 'editCategoryOpen', id: id, name: name, description: description, status: status });
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-4 bg-white overflow-x-auto border border-gray-200 rounded-sm shadow-lg">
			<table className="min-w-full text-sm divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="pl-4 py-2 font-medium text-left text-black">Index</th>
						<th className="py-2 font-medium text-left text-black">Name</th>
						<th className="py-2 font-medium text-left text-black">Description</th>
						<th className="py-2 font-medium text-left text-black">Status</th>
						<th className="py-2 font-medium text-left text-black">Created At</th>
						<th className="py-2 font-medium text-left text-black">Updated At</th>
						<th className="py-2 font-medium text-left text-black">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{categories.length > 0 ? (
						categories.map((item, index) => {
							return (
								<tr key={item._id}>
									<td className="p-4 text-black/70">{index + 1}</td>
									<td className="py-4 text-black/70">{item.name}</td>
									<td className="py-4 text-black/70">
										{item.description.length < 20 ? item.description : item.description.slice(0, 20) + '...'}
									</td>
									<td className="py-4">
										<span
											className={`py-[6px] px-4 rounded-full border border-black/10 text-xs font-medium cursor-pointer select-none ${
												item.status === 'New'
													? 'border-black/10 text-black bg-white'
													: item.status === 'Disabled'
													? 'border-gray-300 text-gray-500 bg-gray-300'
													: item.status === 'Active' && 'border-green-100 text-green-700 bg-green-100'
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="py-4 text-black/70">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
									<td className="py-4 text-black/70">{dayjs(item.updatedAt).format('DD/MM/YYYY')}</td>
									<td className="py-4 text-black/70">
										<div className="flex items-center space-x-4">
											<span
												onClick={() =>
													handleEditCategory(item._id, item.name, item.description, item.status)
												}
												className="cursor-pointer select-none hover:text-amber-500"
											>
												<BsPencilFill />
											</span>
											<span
												onClick={() => handleDeleteCategory(item._id)}
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
							<td className="py-2 px-4 text-black/50 italic font-light">No category found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default CategoryTable;
