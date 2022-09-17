import React, { useState } from 'react';

const RatingReviewForm = () => {
	const [data, setData] = useState({ review: '', rating: '', error: null, success: null });

	const handlePostReivew = async () => {};

	return (
		<div className="mt-8 flex flex-col">
			<div className="flex flex-col space-y-2">
				<span className="text-lg font-medium">Add a review</span>
				<span className="text-gray-400 text-sm italic font-light">Your email address will not be published. Required fields are marked *</span>
			</div>
			<div className="mb-2">
				<fieldset className="rating">
					<input type="radio" className="rating" id="star5" name="rating" defaultValue={5} />
					<label className="full" htmlFor="star5" title="Awesome - 5 stars" />
					<input type="radio" className="rating" id="star4" name="rating" defaultValue={4} />
					<label className="full" htmlFor="star4" title="Pretty good - 4 stars" />
					<input type="radio" className="rating" id="star3" name="rating" defaultValue={3} />
					<label className="full" htmlFor="star3" title="Meh - 3 stars" />
					<input type="radio" className="rating" id="star2" name="rating" defaultValue={2} />
					<label className="full" htmlFor="star2" title="Kinda bad - 2 stars" />
					<input type="radio" className="rating" id="star1" name="rating" defaultValue={1} />
					<label className="full" htmlFor="star1" title="Sucks big time - 1 star" />
				</fieldset>
			</div>
			<div className="space-y-2">
				<label className="text-sm text-black/80">Review *</label>
				<textarea
					rows={5}
					placeholder="Write a review"
					className="py-1 px-2 text-sm w-full h-auto bg-white border border-black/10 rounded-md outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
				/>
				<button type="button" onClick={() => handlePostReivew()} className="py-[10px] px-4 bg-black text-white font-medium text-sm rounded-md">
					Post Review
				</button>
			</div>
		</div>
	);
};

export default RatingReviewForm;
