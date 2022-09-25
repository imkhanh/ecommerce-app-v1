import React, { useContext } from 'react';
import { BsStarFill, BsTrash } from 'react-icons/bs';
import { LayoutContext } from '..';
import { getSingleProduct, postDeleteReview } from './FetchApi';
import { isAuth } from '../auth/Authenticated';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const AllReviews = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const reviews = state.singleProduct.reviews;

	const fetchSingleProduct = async () => {
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
			pId: id,
		};

		try {
			const res = await postDeleteReview(formData);
			if (res.data.success) {
				fetchSingleProduct();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mb-8 flex flex-col space-y-4">
			<div className="divide-y divide-black/10">
				{reviews && reviews.length > 0 ? (
					reviews.map((item) => {
						return (
							<div key={item._id} className="py-8 bg-white">
								<div>
									<p className="font-semibold text-lg md:text-base">{item.title}</p>
									<div className="flex items-center justify-between">
										<div className="text-gray-500 text-sm">
											{item.user.userName ? item.user.userName : ''}. on {dayjs(item.createdAt).format('DD/MM/YYYY')}
										</div>
										<div className="flex items-center space-x-4">
											<div className="flex">
												{[...Array(Number(item.rating))].map((_, index) => {
													return (
														<span key={index} className="text-yellow-500 text-xs">
															<BsStarFill />
														</span>
													);
												})}
												{[...Array(5 - Number(item.rating))].map((_, index) => {
													return (
														<span key={index} className="text-gray-300 text-xs">
															<BsStarFill />
														</span>
													);
												})}
											</div>
											{isAuth().user && item.user && item.user._id === isAuth().user._id && (
												<div>
													<span onClick={() => handleDeleteReview(item._id)} className="text-sm cursor-pointer select-none">
														<BsTrash />
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="mt-8">
									<p className="text-black text-base font-medium">{item.review}</p>
								</div>
							</div>
						);
					})
				) : (
					<div>
						There are no reviews for this product. Be the first to review <span className="font-semibold">{state.singleProduct.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllReviews;
