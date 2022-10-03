import React from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';

const Pagination = ({ page, setPage, result }) => {
	return result < page * 8 ? (
		''
	) : (
		<div
			onClick={() => setPage(page + 1)}
			className="flex flex-col space-y-2 items-center justify-center cursor-pointer select-none"
		>
			<span className="text-sm">Load More</span>
			<button className="animate-bounce">
				<BsChevronDoubleDown />
			</button>
		</div>
	);
};

export default Pagination;
