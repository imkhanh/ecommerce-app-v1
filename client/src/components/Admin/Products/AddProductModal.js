import React, { useContext, useEffect, useState } from 'react';
import { getAllCategories, postAddProduct } from './FetchApi';
import Overlay from '../Layout/Overlay';
import { ProductsContext } from '.';

const AddProductModal = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState({
		name: '',
		description: '',
		category: '',
		brand: '',
		price: 0,
		quantity: 0,
		offer: 0,
		images: [],
		status: '',
		shipping: '',
		success: '',
		error: '',
	});

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
			const res = await postAddProduct({
				name: data.name,
				description: data.description,
				category: data.category,
				brand: data.brand,
				price: data.price,
				quantity: data.quantity,
				offer: data.offer,
				images: data.images,
				status: data.status,
				shipping: data.shipping,
			});

			if (res && res.data.success) {
				setData({
					...data,
					name: '',
					description: '',
					category: '',
					brand: '',
					price: 0,
					quantity: 0,
					offer: 0,
					images: [],
					status: '',
					shipping: '',
					success: res.data.success,
					error: false,
				});
			} else {
				setData({ ...data, success: false, error: res.data.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({
				...data,
				name: '',
				description: '',
				category: '',
				brand: '',
				price: 0,
				quantity: 0,
				offer: 0,
				images: null,
				status: '',
				shipping: '',
				success: false,
				error: false,
				loading: false,
			});
		}, 2000);
	}

	return (
		<div className="relative">
			<Overlay state={state.addProduct} dispatch={() => dispatch({ type: 'addProduct', payload: false })} />
			<div
				className={`${
					state.addProduct ? '' : 'hidden'
				} bg-white fixed top-10 left-1/2 transform -translate-x-1/2 max-w-lg w-full h-auto rounded-sm z-[70]`}
			>
				<div className="h-14 flex items-center justify-center">
					<h2 className="font-semibold text-xl uppercase">Add Product</h2>
				</div>

				{data.success && <div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{data.success}</div>}
				{data.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{data.error}</div>}

				<form onSubmit={handleSubmit} className="py-4 px-12 space-y-4">
					<div className=" space-y-1">
						<span className="text-sm">Name</span>
						<input
							type="text"
							name="name"
							value={data.name}
							onChange={(e) => setData({ ...data, success: false, error: false, name: e.target.value })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
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
							className="p-2 w-full text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
						/>
					</div>
					<div className=" grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<span className="text-sm">Category</span>
							<select
								name="category"
								value={data.category}
								onChange={(e) => setData({ ...data, success: false, error: false, category: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
							>
								<option disabled value="">
									Select category
								</option>
								{categories.map((item) => {
									return (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Shipping</span>
							<select
								name="shipping"
								value={data.shipping}
								onChange={(e) => setData({ ...data, success: false, error: false, shipping: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
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
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
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
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Offer (%)</span>
							<input
								type="text"
								name="offer"
								value={data.offer}
								onChange={(e) => setData({ ...data, success: false, error: false, offer: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
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
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-sm">Status</span>
							<select
								name="status"
								value={data.status}
								onChange={(e) => setData({ ...data, success: false, error: false, status: e.target.value })}
								className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
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
						<input
							type="file"
							name="images"
							multiple
							accept="*/images"
							onChange={(e) => setData({ ...data, success: false, error: false, images: [...e.target.files] })}
							className="px-2 w-full h-10 text-sm bg-white border border-black/10 rounded-sm outline-none focus:border-black"
						/>
					</div>
					<button className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">Add</button>
				</form>
			</div>
		</div>
	);
};

export default AddProductModal;
