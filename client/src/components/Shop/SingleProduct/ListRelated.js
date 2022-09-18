import React from 'react';
import { Link } from 'react-router-dom';

const ListRelated = () => {
	return (
		<div className="py-24">
			<h1 className="mb-12 text-xl lg:text-lg uppercase font-bold">you also might like</h1>
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
				<div className="relative mb-8 bg-white z-0">
					<figure>
						<Link to={`/shop/detail`}>
							<img src={`http://localhost:3000/uploads/products/1663162527183_1.webp`} alt="" className="w-full h-full object-cover" />
						</Link>
					</figure>
					<div className="pt-4">
						<Link to={`/shop/detail/`} className="text-sm uppercase font-bold truncate">
							Product
						</Link>
						<p className="mt-1 text-black/50">Category</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListRelated;
