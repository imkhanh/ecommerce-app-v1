import React, { useContext, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewDisplay';
import { LayoutContext } from '../Layout/Layout';
import { isAuth } from '../Auth/Auth';

const RatingReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [showReview, setShowReview] = useState(false);
	const product = state.singleProduct.ratingReviews;

	return (
		<div className="py-6 border-y border-gray-200">
			<div onClick={() => setShowReview(!showReview)} className="flex items-center justify-between">
				<h4 className="cursor-pointer text-lg text-black select-none">Reviews ({product.length})</h4>
				<span className="cursor-pointer select-none">{showReview ? <BsChevronUp /> : <BsChevronDown />}</span>
			</div>
			{showReview && (
				<div className="pt-8 space-y-8">
					<ReviewDisplay />
					{isAuth() ? (
						<div className="text-sm flex items-center">
							Write a review.
							<p onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="ml-1 font-medium text-black cursor-pointer">
								Please login
							</p>
						</div>
					) : (
						<ReviewForm />
					)}
				</div>
			)}
		</div>
	);
};

export default RatingReviews;
