import React from 'react';
import { isAuth } from '../Auth/Authenticated';

const CustomerReviews = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-1 divide-x divide-black/10">
			<div className="p-32 xl:p-28 lg:p-24 md:p-20 space-y-4 flex flex-col">
				<h4 className="text-5xl xl:text-4xl lg:text-3xl md:text-2xl font-bold">Customer Review</h4>
				<p className="font-medium">12 reviews </p>
			</div>
			<div className="p-20 md:border-t border-black/10">
				<div>All review</div>
				{!isAuth() ? (
					<div>
						<p className="cursor-pointer underline underline-offset-4">Write a review</p>
					</div>
				) : (
					<div>Review form</div>
				)}
			</div>
		</div>
	);
};

export default CustomerReviews;
