import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewDisplay';
// import { LayoutContext } from '../Layout/Layout';

const RatingReviews = () => {
	// const { state } = useContext(LayoutContext);
	const [showReview, setShowReview] = useState(false);
	// const product = state.singleProduct.ratingReviews;

	return (
		<div className="py-4 border-y border-gray-300">
			<div onClick={() => setShowReview(!showReview)} className="flex items-center justify-between">
				<h4 className="font-medium cursor-pointer select-none">Reviews (0)</h4>
				<span className="cursor-pointer select-none">{showReview ? <BsChevronUp /> : <BsChevronDown />}</span>
			</div>
			{showReview && (
				<div className="mt-8">
					<ReviewForm />
					<ReviewDisplay />
				</div>
			)}
		</div>
	);
};

export default RatingReviews;
