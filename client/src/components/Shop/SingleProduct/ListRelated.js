import React from 'react';
import ProductItem from '../Products/ProductItem';

const ListRelated = ({ lists }) => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-1 divide-x divide-black/10">
			<div className="p-32 xl:p-28 lg:p-24 md:p-20 flex items-center justify-start md:justify-center">
				<h4 className="text-5xl xl:text-5xl lg:text-4xl md:text-2xl font-bold">You may also like</h4>
			</div>
			<div
				className={`grid ${
					lists.length === 1
						? 'grid-cols-1'
						: lists.length === 2
						? 'grid-cols-2'
						: lists.length === 3
						? 'grid-cols-2 grid-rows-1'
						: lists.length === 4 && 'grid-cols-2 grid-rows-2'
				} md:border-t`}
			>
				{lists && lists.length > 0 ? (
					lists.map((product) => {
						return <ProductItem key={product._id} product={product} />;
					})
				) : (
					<div className="p-8 text-black/40 italic">No product found</div>
				)}
			</div>
		</div>
	);
};

export default ListRelated;
