import React from 'react';

const CustomerReviews = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-1 divide-x divide-black/10">
			<div className="p-32 xl:p-28 lg:p-24 md:p-20 flex items-center justify-start md:justify-center">
				<h4 className="text-5xl xl:text-4xl lg:text-3xl md:text-2xl font-bold">Customer Review</h4>
			</div>
			<div className="p-20 md:border-t border-black/10">
				<div>Review</div>
				<div></div>
			</div>
		</div>
	);
};

export default CustomerReviews;
