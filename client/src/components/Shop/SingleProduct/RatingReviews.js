import React, { useContext, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { isAuth } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';
import ReviewDisplay from './ReviewDisplay';
import ReviewForm from './ReviewForm';

const RatingReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;
	const [show, setShow] = useState(false);

	return (
		<div className="py-5">
			<div onClick={() => setShow(!show)} className="flex items-center justify-between cursor-pointer select-none">
				<span className="text-lg font-semibold">Reviews ({product.ratingReviews && product.ratingReviews.length})</span>
				<span>
					<span>{show ? <BsChevronUp /> : <BsChevronDown />}</span>
				</span>
			</div>
			{show && (
				<div className="pt-6">
					{!isAuth() ? (
						<>
							<p className="mb-2 font-light">Have your say. Be the first to review the {product.name}.</p>
							<p onClick={() => dispatch({ type: 'authModal', payload: true })} className="cursor-pointer select-none underline underline-offset-4">
								Write a Review
							</p>
						</>
					) : (
						<>
							<ReviewDisplay />
							<ReviewForm />
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default RatingReviews;
