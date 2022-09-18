import React, { useContext } from 'react';
import { LayoutContext } from '../Layout/Layout';
import dayjs from 'dayjs';
import { isAuth } from '../Auth/Authentication';
import { getSingleProduct, postDeleteReview } from './FetchData';
import { useParams } from 'react-router-dom';
import { IoStarSharp, IoTrashBinSharp } from 'react-icons/io5';

const RatingReviewDisplay = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const reviews = state.singleProduct ? state.singleProduct.ratingReviews : null;

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		let formData = {
			rId: reviewId,
			proId: id,
		};

		try {
			const res = await postDeleteReview(formData);
			if (res.data.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="divide-y divide-gray-200">
			{reviews && reviews.length > 0 ? (
				reviews.map((r) => {
					return (
						<div key={r._id} className="py-2 bg-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="flex items-center">
										{[...Array(Number(r.rating))].map((_, index) => {
											return (
												<span key={index} className="text-sm text-[#ffd700]">
													<IoStarSharp />
												</span>
											);
										})}
										{[...Array(5 - Number(r.rating))].map((_, index) => {
											return (
												<span key={index} className="text-sm text-black/10">
													<IoStarSharp />
												</span>
											);
										})}
									</div>
									<div className="flex items-center space-x-1">
										<p className="font-light text-sm text-gray-400">{r.user.userName ? r.user.userName : ''}</p>
										<span className="text-gray-300">-</span>
										<p className="font-light text-sm text-gray-400">{dayjs(r.createdAt).format('DD/MM/YYYY')}</p>
									</div>
								</div>
								{r.user && isAuth().user && r.user._id === isAuth().user._id && (
									<div>
										<span onClick={() => handleDeleteReview(r._id)} className="cursor-pointer select-none text-gray-400 hover:text-red-500">
											<IoTrashBinSharp />
										</span>
									</div>
								)}
							</div>
							<div className="mt-2">
								<p className="text-black/80">{r.review}</p>
							</div>
						</div>
					);
				})
			) : (
				<p className="font-light">Have your say. Be the first to review the {state.singleProduct.name}.</p>
			)}
		</div>
	);
};

export default RatingReviewDisplay;
