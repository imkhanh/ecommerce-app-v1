import React, { useContext, useEffect, useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import { ProductsContext } from '.';
import Overlay from '../Common/Overlay';
import { getAllCategories, getAllProducts, getAllProductsByFilters } from './FetchApi';

const ProductSidebar = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState('');
	const [status, setStatus] = useState(['New', 'Sale', 'Sold Out']);
	const [shipping, setShipping] = useState(['Yes', 'No']);

	useEffect(() => {
		fetchAllCategories();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchAllProductsByFilters({ query: search });
			if (!search) {
				fetchAllProducts();
			}
		}, 300);

		return () => clearTimeout(delayed);
		// eslint-disable-next-line
	}, [search]);

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
		try {
			const res = await getAllProductsByFilters(arg);
			dispatch({ type: 'products', payload: res.data.products });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
		fetchAllProductsByFilters({ name: e.target.value });
	};

	const handleChangeCategory = (e) => {
		setCategory(e.target.value);
		fetchAllProductsByFilters({ category: e.target.value });
	};

	const resetAll = () => {
		setCategory('');
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
							onChange={handleSearch}
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
											type="radio"
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
							{status.map((item, index) => {
								return (
									<div key={index} className="flex items-center">
										<input type="checkbox" className="h-5 w-5 rounded border-gray-200" />
										<span className="ml-3 text-sm font-medium">{item}</span>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Shipping</span>
						<div className="px-5 py-3 space-y-2">
							{shipping.map((item, index) => {
								return (
									<div key={index} className="flex items-center">
										<input type="checkbox" className="h-5 w-5 rounded border-gray-200" />
										<span className="ml-3 text-sm font-medium">{item}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSidebar;
