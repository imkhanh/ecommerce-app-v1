import React, { useContext } from 'react';
import { BsStarFill, BsTrash } from 'react-icons/bs';
import { LayoutContext } from '../Layout/Layout';
import dayjs from 'dayjs';
import { isAuth } from '../Auth/Authentication';
import { getSingleProduct, postDeleteReview } from './FetchData';
import { useParams } from 'react-router-dom';

const RatingReviewDisplay = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const reviews = state.singleProduct.ratingReviews;

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
								<div className="flex items-center space-x-1">
									<div className="flex items-center">
										{[...Array(Number(r.rating))].map((_, index) => {
											return (
												<span key={index} className="text-sm text-yellow-300">
													<BsStarFill />
												</span>
											);
										})}
										{[...Array(5 - Number(r.rating))].map((_, index) => {
											return (
												<span key={index} className="text-sm text-gray-200">
													<BsStarFill />
												</span>
											);
										})}
									</div>
									<span className="text-gray-400">-</span>
									<p className="text-sm text-gray-400">{r.user.userName ? r.user.userName : ''}</p>
									<span className="text-gray-300">-</span>
									<p className="font-light text-sm text-gray-400">{dayjs(r.createdAt).format('DD/MM/YYYY')}</p>
								</div>
								{r.user && r.user._id === isAuth().user._id && (
									<div>
										<span onClick={() => handleDeleteReview(r._id)} className="cursor-pointer select-none text-gray-400 hover:text-black">
											<BsTrash />
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
