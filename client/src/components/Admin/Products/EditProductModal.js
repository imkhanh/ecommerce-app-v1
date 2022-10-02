import React, { Fragment, useContext, useEffect, useState } from 'react';
import { editProduct, getAllCategories } from './FetchApi';
import Overlay from '../Layout/Overlay';
import { ProductsContext } from '.';

const EditProductModal = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const [categories, setCategories] = useState([]);
	const [editdata, setEditData] = useState({
		id: '',
		name: '',
		description: '',
		category: '',
		brand: '',
		price: 0,
		quantity: 0,
		offer: 0,
		images: null,
		editImages: null,
		status: '',
		shipping: '',
		success: '',
		error: '',
	});

	useEffect(() => {
		setEditData({
			id: state.editProduct.id,
			name: state.editProduct.name,
			description: state.editProduct.description,
			category: state.editProduct.category,
			brand: state.editProduct.brand,
			price: state.editProduct.price,
			quantity: state.editProduct.quantity,
			offer: state.editProduct.offer,
			images: state.editProduct.images,
			status: state.editProduct.status,
			shipping: state.editProduct.shipping,
		});
		// eslint-disable-next-line
	}, [state.editProduct]);

	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const res = await getAllCategories();
				setCategories(res.data.categories);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllCategories();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await editProduct(editdata);
			if (res && res.data.success) {
				setEditData({ ...editdata, success: res.data.success, error: false });
				dispatch({ type: 'editProductClose', payload: true });
			} else {
				setEditData({ ...editdata, success: false, error: res.data.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (editdata.error || editdata.success) {
		setTimeout(() => {
			setEditData({ ...editdata, success: false, error: false, loading: false });
		}, 2000);
	}

	return (
		<div className="relative">
			<Overlay
				state={state.editProduct.modal}
				dispatch={() => dispatch({ type: 'editProductClose', payload: false })}
			/>
			<div
				className={`${
					state.editProduct.modal ? '' : 'hidden'
				} bg-white fixed top-6 left-1/2 transform -translate-x-1/2 max-w-lg w-full h-auto rounded-sm z-[70]`}
			>
				<div className="h-14 flex items-center justify-center">
					<h2 className="font-semibold text-xl uppercase">Edit Product</h2>
				</div>

				{editdata.success && (
					<div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{editdata.success}</div>
				)}
				{editdata.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{editdata.error}</div>}

				<form onSubmit={handleSubmit} className="py-4 px-12 space-y-3">
					<div className=" space-y-1">
						<span className="text-sm">Name</span>
						<input
							type="text"
							name="name"
							value={editdata.name}
							onChange={(e) => setEditData({ ...editdata, success: false, error: false, name: e.target.value })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>
					<div className=" space-y-1">
						<span className="text-sm">Description</span>
						<textarea
							type="text"
							name="description"
							rows={4}
							value={editdata.description}
							onChange={(e) =>
								setEditData({ ...editdata, success: false, error: false, description: e.target.value })
							}
							className="p-2 w-full text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>
					<div className=" grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<span className="text-sm">Category</span>
							<select
								name="category"
								value={editdata.category}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, category: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							>
								<option disabled value="">
									Select category
								</option>
								{categories && categories.length > 0
									? categories.map((item) => {
											return (
												<Fragment key={item._id}>
													{editdata.category && editdata.category._id === item._id ? (
														<option key={item._id} value={item._id} selected>
															{item.name}
														</option>
													) : (
														<option key={item._id} value={item._id}>
															{item.name}
														</option>
													)}
												</Fragment>
											);
									  })
									: ''}
							</select>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Shipping</span>
							<select
								name="shipping"
								value={editdata.shipping}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, shipping: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							>
								<option disabled value="">
									Select shipping
								</option>

								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>
					</div>
					<div className=" space-y-1">
						<span className="text-sm">Brand</span>
						<input
							type="text"
							name="brand"
							value={editdata.brand}
							onChange={(e) =>
								setEditData({ ...editdata, success: false, error: false, brand: e.target.value.split(',') })
							}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>

					<div className=" grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<span className="text-sm">Price ($)</span>
							<input
								type="text"
								name="price"
								value={editdata.price}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, price: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Offer (%)</span>
							<input
								type="text"
								name="offer"
								value={editdata.offer}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, offer: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className=" grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<span className="text-sm">Quantity</span>
							<input
								type="text"
								name="quantity"
								value={editdata.quantity}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, quantity: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Status</span>
							<select
								name="status"
								value={editdata.status}
								onChange={(e) =>
									setEditData({ ...editdata, success: false, error: false, status: e.target.value })
								}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							>
								<option disabled value="">
									Select status
								</option>

								<option value="New">New</option>
								<option value="Sale">Sale</option>
								<option value="Sold Out">Sold Out</option>
							</select>
						</div>
					</div>
					<div className="mb-4 space-y-1">
						<span className="text-sm">Images</span>
						<div className="pb-1 flex space-x-1">
							{editdata.images &&
								editdata.images.length > 0 &&
								editdata.images.map((img, index) => {
									return (
										<img
											alt={index}
											key={index}
											src={`http://localhost:3000/uploads/products/${img}`}
											className="p-1 w-10 h-10 object-cover border border-black/10"
										/>
									);
								})}
						</div>
						<input
							type="file"
							multiple
							accept="*/images"
							onChange={(e) =>
								setEditData({ ...editdata, success: false, error: false, editImages: [...e.target.files] })
							}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>
					<button type="submit" className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">
						Edit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
