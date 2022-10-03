import React, { useContext, useEffect, useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import { ProductsContext } from '.';
import Overlay from '../Common/Overlay';
import { getAllCategories, getAllProducts, getAllProductsByFilters } from './FetchApi';

const ProductSidebar = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products } = state;

	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState('');
	const [shipping, setShipping] = useState('');
	const [status, setStatus] = useState('');
	const [price, setPrice] = useState(0);

	useEffect(() => {
		fetchAllCategories();
		// eslint-disable-next-line
	}, []);

	const fetchAllCategories = async () => {
		try {
			const res = await getAllCategories();
			setCategories(res.data.categories);
		} catch (error) {
			console.log(error);
		}
	};

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

	const fetchAllProductsByFilters = async (arg) => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProductsByFilters(arg);
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (search.trim() === '') {
			fetchAllProducts();
		} else {
			fetchAllProductsByFilters({ query: search });
		}

		// eslint-disable-next-line
	}, [search]);

	const handleChangeCategory = (e) => {
		setCategory(e.target.value);
		fetchAllProductsByFilters({ category: e.target.value });
	};

	const handleChangeShipping = (e) => {
		setShipping(e.target.value);
		fetchAllProductsByFilters({ shipping: e.target.value });
	};

	const handleChangeStatus = (e) => {
		setStatus(e.target.value);
		fetchAllProductsByFilters({ status: e.target.value });
	};

	const handleChangePrice = (e) => {
		setPrice(e.target.value);
		fetchAllProductsByFilters({ price: e.target.value });
	};

	const resetAll = () => {
		setCategory('');
		setSearch('');
		setShipping('');
		setStatus('');
		setPrice(0);
		fetchAllProducts();
	};

	return (
		<div className="relative z-[100]">
			<Overlay state={state.sideBarToggle} dispatch={() => dispatch({ type: 'sideBarToggle', payload: false })} />
			<div
				className={`fixed top-0 right-0 ${
					state.sideBarToggle ? 'w-[448px] opacity-100' : 'w-0 opacity-0'
				}  h-screen shadow-lg bg-white duration-300 ease-in-out z-[70]`}
			>
				<div className="flex items-center justify-between px-5 h-14 border-b border-black/10">
					<span className="text-sm font-medium">{products && products.length} products</span>
					<span
						className="text-2xl text-black/50 hover:text-black cursor-pointer select-none"
						onClick={() => dispatch({ type: 'sideBarToggle', payload: false })}
					>
						<BsX />
					</span>
				</div>

				<div className="px-5 py-3">
					<button
						onClick={() => resetAll()}
						type="button"
						className="text-xs font-medium text-gray-600 underline rounded"
					>
						Reset All
					</button>
				</div>

				<div className="flex flex-col h-full overflow-y-scroll">
					<div className="relative px-5 flex items-center">
						<span className="absolute top-1/2 left-5 transform -translate-y-1/2">
							<BsSearch />
						</span>
						<input
							type="text"
							name="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search..."
							className="pl-7 text-sm w-full h-10 border-b border-gray-300 outline-none focus:border-black"
						/>
					</div>

					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Categories</span>
						<div className="px-5 py-3 space-y-2">
							{categories.map((item, index) => {
								return (
									<div key={index} className="flex items-center">
										<input
											type="checkbox"
											name="category"
											value={item._id}
											onChange={handleChangeCategory}
											defaultChecked={item._id === category}
											className="h-5 w-5 rounded border-gray-200 cursor-pointer"
										/>
										<span className="ml-3 text-sm font-medium">{item.name}</span>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Status</span>
						<div className="px-5 py-3 space-y-2">
							<div className="flex items-center">
								<input
									type="checkbox"
									value="New"
									defaultChecked={status === 'New'}
									onChange={handleChangeStatus}
									className="h-5 w-5 rounded border-gray-200"
								/>
								<span className="ml-3 text-sm font-medium">New</span>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									value="Sale"
									defaultChecked={shipping === 'Sale'}
									onChange={handleChangeStatus}
									className="h-5 w-5 rounded border-gray-200"
								/>
								<span className="ml-3 text-sm font-medium">Sale</span>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									value="Sold Out"
									defaultChecked={shipping === 'Sold Out'}
									onChange={handleChangeStatus}
									className="h-5 w-5 rounded border-gray-200"
								/>
								<span className="ml-3 text-sm font-medium">Sold Out</span>
							</div>
						</div>
					</div>

					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Shipping</span>
						<div className="px-5 py-3 space-y-2">
							<div className="flex items-center">
								<input
									type="checkbox"
									value="Yes"
									defaultChecked={shipping === 'Yes'}
									onChange={handleChangeShipping}
									className="h-5 w-5 rounded border-gray-200"
								/>
								<span className="ml-3 text-sm font-medium">Yes</span>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									value="No"
									defaultChecked={shipping === 'No'}
									onChange={handleChangeShipping}
									className="h-5 w-5 rounded border-gray-200"
								/>
								<span className="ml-3 text-sm font-medium">No</span>
							</div>
						</div>
					</div>
					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Price</span>
						<div className="px-5 py-3 space-y-2">
							<div className="flex flex-col">
								<span className="mb-4 text-sm font-light text-black/50">Price ${price} between $5000</span>

								<input
									type="range"
									value={price}
									min="0"
									max="5000"
									onChange={handleChangePrice}
									className="w-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSidebar;
