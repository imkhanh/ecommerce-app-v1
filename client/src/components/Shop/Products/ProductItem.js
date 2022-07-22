import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = () => {
	return (
		<aside className="bg-white ">
			<figure>
				<Link to={`/product/detail/`}>
					<img src="https://image.thanhnien.vn/w1024/Uploaded/2022/zngujt/2021_08_14/training_11_08_2021__291628703763241_medium_sarx.jpg" alt="" className="h-[320px] lg:h-full w-full object-cover" />
				</Link>
			</figure>
			<div className="pt-4 text-sm md:text-xs">
				<Link to={`/product/detail/`} className="font-semibold">
					Name
				</Link>
				<p className="my-2">Category</p>
				<p>$300</p>
			</div>
		</aside>
	);
};

export default ProductItem;
