import React, { useState } from 'react';

const ProductFilter = () => {
	const [show, setShow] = useState(false);

	return (
		<div className="h-full">
			<div className="py-4 sticky top-0 transition-all flex items-center justify-between bg-white z-30">
				<div>
					<span>1 products</span>
				</div>
				<div className="flex items-center">
					<div onClick={() => setShow(!show)}>1</div>
					<div>2</div>
					<div>3</div>
				</div>
			</div>

			<div className={`${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} absolute transform transition duration-300 ease-in-out`}>section</div>
		</div>
	);
};

export default ProductFilter;
