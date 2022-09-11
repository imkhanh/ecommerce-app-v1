import React from 'react';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const ProductHeader = () => {
	return (
		<div className="sticky top-14 h-16 bg-white z-20">
			<div className="h-full flex items-center justify-between">
				<div>
					<span className="text-sm text-black/60">showing 7 of 24 products</span>
				</div>
				<div className="flex items-center space-x-2">
					<span>
						<BsFillGrid3X3GapFill className="text-xl" />
					</span>
					<select className="border border-black rounded-sm">
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductHeader;
