import React, { useContext } from 'react';
import { isAuth } from '../auth/Authenticated';
import { LayoutContext } from '..';
import ReviewForm from './ReviewForm';
import AllReviews from './AllReviews';
import './style.css';

const CustomerReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className="grid grid-cols-2 md:grid-cols-1 divide-x divide-black/10">
			<div className="py-32 pl-32 xl:py-28 xl:pl-28 lg:py-24 lg:pl-24 md:py-20 md:pl-0 space-y-4 flex flex-col items-start justify-center md:items-center">
				<h4 className="text-5xl xl:text-4xl lg:text-3xl md:text-2xl font-bold">Customer Review</h4>
				<p>{state.singleProduct.reviews.length} reviews</p>
				{!isAuth() && (
					<div>
						<button
							onClick={() => dispatch({ type: 'authModal', payload: true })}
							className="py-2 px-4 text-base lg:text-sm lg:py-[6px] uppercase font-medium bg-black text-white rounded-full"
						>
							Write a review
						</button>
					</div>
				)}
			</div>
			<div className="p-20 lg:p-16 md:p-4 md:border-t border-black/10">
				<AllReviews />
				{isAuth() && <ReviewForm />}
			</div>
		</div>
	);
};

export default CustomerReviews;
