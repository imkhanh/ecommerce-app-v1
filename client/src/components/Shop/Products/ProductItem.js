import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = () => {
	return (
		<aside className="bg-white border border-gray-200">
			<figure>
				<Link to={`/product/detail/`}>
					<img src="https://image.thanhnien.vn/w1024/Uploaded/2022/zngujt/2021_08_14/training_11_08_2021__291628703763241_medium_sarx.jpg" alt="" className="h-[320px] lg:h-full w-full object-cover" />
				</Link>
			</figure>
			<div className="pt-4">
				<Link to={`/product/detail/`}>Name</Link>
				<p>Category</p>
				<p>Price</p>
			</div>
		</aside>
	);
};

export default ProductItem;
