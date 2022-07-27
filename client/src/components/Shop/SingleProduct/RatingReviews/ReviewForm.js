import React from 'react';

const ReviewForm = () => {
	return (
		<div>
			<div></div>
			<div className="space-y-2">
				<textarea rows={5} placeholder="Write a review" className="p-2 text-sm w-full border border-gray-200 rounded-[3px] outline-none focus:border-black transition-all" />
				<button type="button" className="py-2 px-4 text-sm font-medium bg-black text-white rounded-[3px]">
					Submit
				</button>
			</div>
		</div>
	);
};

export default ReviewForm;
