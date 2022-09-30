import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '.';
import Overlay from '../Layout/Overlay';
import { editCategory, getAllCategories } from './FetchApi';

const EditCategory = () => {
	const { state, dispatch } = useContext(CategoryContext);
	const [data, setData] = useState({
		id: '',
		name: '',
		description: '',
		status: '',
		success: '',
		error: '',
	});

	useEffect(() => {
		setData({
			id: state.editCategory.id,
			name: state.editCategory.name,
			description: state.editCategory.description,
			status: state.editCategory.status,
		});

		// eslint-disable-next-line
	}, [state.editCategory.modal]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await editCategory({
				id: data.id,
				name: data.name,
				description: data.description,
				status: data.status,
			});
			if (res && res.data.success) {
				fetchAllCategories();
				dispatch({ type: 'editCategoryClose', paylaod: false });
			} else {
				setData({ ...data, success: false, error: res.data.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, id: '', name: '', description: '', status: '', success: false, error: false });
		}, 2000);
	}

	return (
		<div className="relative">
			<Overlay
				state={state.editCategory.modal}
				dispatch={() => dispatch({ type: 'editCategoryClose', payload: false })}
			/>
			<div
				className={`${
					state.editCategory.modal ? '' : 'hidden'
				} bg-white fixed top-12 left-1/2 transform -translate-x-1/2 max-w-lg w-full h-auto rounded-sm z-[70]`}
			>
				<div className="h-14 flex items-center justify-center">
					<h2 className="font-semibold text-lg uppercase">Edit Category</h2>
				</div>

				{data.success && <div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{data.success}</div>}
				{data.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{data.error}</div>}

				<form onSubmit={handleSubmit} className="pt-4 pb-6 px-12 space-y-4">
					<div className=" space-y-1">
						<span className="text-sm">Name</span>
						<input
							type="text"
							name="name"
							value={data.name}
							onChange={(e) => setData({ ...data, success: false, error: false, name: e.target.value })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>
					<div className=" space-y-1">
						<span className="text-sm">Description</span>
						<textarea
							type="text"
							name="description"
							rows={4}
							value={data.description}
							onChange={(e) => setData({ ...data, success: false, error: false, description: e.target.value })}
							className="p-2 w-full text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>

					<div className="space-y-1">
						<span className="text-sm">Status</span>
						<select
							name="status"
							value={data.status}
							onChange={(e) => setData({ ...data, success: false, error: false, status: e.target.value })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						>
							<option disabled value="">
								Select status
							</option>

							<option value="New">New</option>
							<option value="Active">Active</option>
							<option value="Disabled">Disabled</option>
						</select>
					</div>
					<button className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">
						Edit Category
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditCategory;
