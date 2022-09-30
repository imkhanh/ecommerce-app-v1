import React, { Fragment, useContext, useEffect, useState } from 'react';
import { editProduct, getAllCategories } from './FetchApi';
import Overlay from '../Layout/Overlay';
import { ProductsContext } from '.';

const EditProductModal = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState({
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
		setData({
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
			const res = await editProduct(data);
			if (res && res.data.success) {
				setData({ ...data, success: res.data.success, error: false });
				dispatch({ type: 'editProductClose', payload: true });
			} else {
				setData({ ...data, success: false, error: res.data.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, success: false, error: false, loading: false });
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

				{data.success && <div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{data.success}</div>}
				{data.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{data.error}</div>}

				<form onSubmit={handleSubmit} className="py-4 px-12 space-y-3">
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
					<div className=" grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<span className="text-sm">Category</span>
							<select
								name="category"
								value={data.category}
								onChange={(e) => setData({ ...data, success: false, error: false, category: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							>
								<option disabled value="">
									Select category
								</option>
								{categories && categories.length > 0
									? categories.map((item) => {
											return (
												<Fragment key={item._id}>
													{data.category._id === item._id ? (
														<option key={item._id} value={item._id}>
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
								value={data.shipping}
								onChange={(e) => setData({ ...data, success: false, error: false, shipping: e.target.value })}
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
							value={data.brand}
							onChange={(e) =>
								setData({ ...data, success: false, error: false, brand: e.target.value.split(',') })
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
								value={data.price}
								onChange={(e) => setData({ ...data, success: false, error: false, price: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Offer (%)</span>
							<input
								type="text"
								name="offer"
								value={data.offer}
								onChange={(e) => setData({ ...data, success: false, error: false, offer: e.target.value })}
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
								value={data.quantity}
								onChange={(e) => setData({ ...data, success: false, error: false, quantity: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
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
								<option value="Sale">Sale</option>
								<option value="Pre Order">Pre Order</option>
								<option value="Sold Out">Sold Out</option>
							</select>
						</div>
					</div>
					<div className="mb-4 space-y-1">
						<span className="text-sm">Images</span>
						<div className="pb-1 flex space-x-1">
							{data.images &&
								data.images.length > 0 &&
								data.images.map((img, index) => {
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
								setData({ ...data, success: false, error: false, editImages: [...e.target.files] })
							}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
						/>
					</div>
					<button className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">Edit</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
