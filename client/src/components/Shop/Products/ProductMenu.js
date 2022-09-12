import React, { useState } from 'react';
import { BsSearch, BsChevronDown, BsChevronUp } from 'react-icons/bs';

const ProductMenu = () => {
	const [state, setState] = useState(false);
	const [state1, setState1] = useState(false);

	return (
		<div className="mb-8 sticky top-14 h-16 bg-white z-30">
			<div className="h-full grid grid-cols-2 md:grid-cols-1 items-center">
				<div className="md:hidden">
					<span className="text-sm text-black/60">showing 7 of 24 products</span>
				</div>
				<div className="flex items-center justify-between space-x-4">
					<div className="w-full relative">
						<span className="absolute top-1/2 left-0 transform -translate-y-1/2">
							<BsSearch />
						</span>
						<input type="text" placeholder="Search" className="pl-6 py-1 text-sm w-full border-b border-black outline-none" />
					</div>
					<div className="w-full py-1 bg-white border-b border-black cursor-pointer select-none">
						<div onClick={() => setState(!state)} className="flex items-center justify-between">
							<span className="text-sm">Category</span>
							<span>{state ? <BsChevronUp /> : <BsChevronDown />}</span>
						</div>
						{state && (
							<div className="relative">
								<div className="absolute right-0 z-10 w-56 mt-4 bg-white border border-gray-100 shadow-md origin-top-right rounded-sm">
									<div className="p-2">1</div>
								</div>
							</div>
						)}
					</div>
					<div className="w-full py-1 bg-white border-b border-black cursor-pointer select-none">
						<div onClick={() => setState1(!state1)} className="flex items-center justify-between">
							<span className="text-sm">Sort by</span>
							<span>{state1 ? <BsChevronUp /> : <BsChevronDown />}</span>
						</div>
						{state1 && (
							<div className="relative">
								<div className="absolute right-0 z-10 w-56 mt-4 bg-white border border-gray-100 shadow-md origin-top-right rounded-sm">
									<div className="p-2">1</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductMenu;
