import React, { useContext } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { isAuth } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';
import useClickOutSide from '../Utils/useClickOutSide';
import ReviewDisplay from './ReviewDisplay';
import ReviewForm from './ReviewForm';

const RatingReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;
	const { divRef, isVisible, setIsVisible } = useClickOutSide();

	return (
		<div ref={divRef} className="py-5">
			<div onClick={() => setIsVisible(!isVisible)} className="flex items-center justify-between cursor-pointer select-none">
				<span className="text-lg font-medium">Reviews ({product.ratingReviews && product.ratingReviews.length})</span>
				<span>
					<span>{isVisible ? <BsChevronUp /> : <BsChevronDown />}</span>
				</span>
			</div>
			{isVisible && (
				<div className="pt-6">
					{!isAuth() ? (
						<p onClick={() => dispatch({ type: 'authModal', payload: true })} className="cursor-pointer select-none underline underline-offset-4">
							Write a Review
						</p>
					) : (
						<ReviewForm />
					)}
					<ReviewDisplay />
				</div>
			)}
		</div>
	);
};

export default RatingReviews;
