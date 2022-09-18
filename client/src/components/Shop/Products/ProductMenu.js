import React, { useContext } from 'react';
import { BsChevronDown, BsChevronUp, BsSearch } from 'react-icons/bs';
import { ProductContext } from './Products';

const ProductMenu = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, categories, searchDropdown, categoryDropdown, sortDropdown } = state;

	return (
		<div className="py-4 sticky top-14 bg-white flex items-center w-full space-x-2 sm:space-x-0 z-10">
			<div className="w-1/2 lg:w-1/3 md:w-1/4 sm:hidden duration-200 ease-in-out">
				<span className="text-black/80 text-sm font-light">{products.length} products</span>
			</div>
			<div className="w-1/2 lg:w-2/3 md:w-3/4 sm:w-full flex items-center justify-between space-x-4 sm:space-x-2 duration-200 ease-in-out">
				<div className="relative w-full " onClick={() => dispatch({ type: 'searchDropdown', payload: true })}>
					<span className={`absolute top-1/2 left-2 transform -translate-y-1/2  ${searchDropdown ? 'text-black' : 'text-gray-500'} `}>
						<BsSearch />
					</span>
					<input
						type="text"
						name="search"
						className="pl-8 py-2 text-sm w-full h-full border border-gray-200 rounded-md outline-none focus:border-black duration-200 ease-in-out"
						placeholder="Search"
					/>
				</div>

				<div className="relative w-full">
					<div
						onClick={() => dispatch({ type: 'categoryDropdown', payload: !categoryDropdown })}
						className={`py-2 px-2.5 border ${
							categoryDropdown ? 'border-black text-black' : 'border-gray-200 text-gray-500'
						} flex items-center justify-between cursor-pointer select-none rounded-md duration-200 ease-in-out`}
					>
						<span className="mr-2 text-sm">Category</span>
						{categoryDropdown ? <BsChevronUp /> : <BsChevronDown />}
					</div>
					{categoryDropdown && (
						<div className="absolute top-11 right-0 origin-top-right w-48 h-auto bg-white border border-gray-200 rounded-md shadow-md flex flex-col">
							{categories.map((item) => {
								return (
									<span key={item._id} className="py-2 px-4 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
										{item.name}
									</span>
								);
							})}
						</div>
					)}
				</div>

				<div className="relative w-full">
					<div
						onClick={() => dispatch({ type: 'sortDropdown', payload: !sortDropdown })}
						className={`py-2 px-2.5 border ${
							sortDropdown ? 'border-black text-black' : 'border-gray-200 text-gray-500'
						} flex items-center justify-between cursor-pointer select-none rounded-md duration-200 ease-in-out`}
					>
						<span className="mr-2 text-sm">Sort</span>
						{sortDropdown ? <BsChevronUp /> : <BsChevronDown />}
					</div>
					{sortDropdown && (
						<div className={`absolute top-11 right-0 origin-top-right w-48 h-auto bg-white border border-gray-200 rounded-md shadow-md`}>
							<span className="py-2 px-4 text-sm rounded-md hover:bg-gray-50 cursor-pointer">1</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductMenu;
