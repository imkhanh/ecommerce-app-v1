import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = () => {
	return (
		<div className="py-12 flex items-center justify-center">
			<ol className="flex justify-center text-xs font-medium gap-1 cursor-pointer select-none">
				<li className="w-10 h-8 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white rounded leading-8">
					<BsChevronLeft />
				</li>
				<li>
					<span className="block w-8 h-8 text-center border border-black/10 rounded leading-8">1</span>
				</li>
				<li className="block w-8 h-8 text-center text-white bg-black border-black rounded leading-8">2</li>
				<li>
					<span className="block w-8 h-8 text-center border border-black/10 rounded leading-8">3</span>
				</li>
				<li>
					<span className="block w-8 h-8 text-center border border-black/10 rounded leading-8">4</span>
				</li>
				<li className="w-10 h-8 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white rounded leading-8">
					<BsChevronRight />
				</li>
			</ol>
		</div>
	);
};

export default Pagination;
