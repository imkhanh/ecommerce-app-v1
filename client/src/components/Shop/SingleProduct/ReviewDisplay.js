import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '..';
import { BsChat, BsStarFill, BsTrash } from 'react-icons/bs';
import { getSingleProduct, deletReview } from './FetchApi';
import dayjs from 'dayjs';
import { isAuth } from '../AuthModal/Authenticated';

const ReviewDisplay = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);

	const reviews = state.singleProduct.reviews;

	const fetchSingleProduct = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		const formData = {
			rId: reviewId,
			pId: id,
		};

		try {
			const res = await deletReview(formData);
			if (res && res.data.success) {
				fetchSingleProduct();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="space-y-8">
			<div className="flex items-center space-x-2">
				<span className="text-2xl">
					<BsChat />
				</span>
				<span className="text-xl font-medium">Reviews</span>
			</div>
			<div className="divide-y divide-y-black/10">
				{reviews.length > 0 ? (
					reviews.map((item) => {
						return (
							<div key={item._id} className="py-4 bg-white">
								<div className="flex items-center justify-between">
									<div className="text-base font-medium">{item.title}</div>
									<div className="flex items-center">
										<div className="flex items-center">
											{[...Array(Number(item.rating))].map((_, index) => {
												return (
													<span key={index} className="text-sm text-yellow-500">
														<BsStarFill />
													</span>
												);
											})}{' '}
											{[...Array(5 - Number(item.rating))].map((_, index) => {
												return (
													<span key={index} className="text-sm text-gray-200">
														<BsStarFill />
													</span>
												);
											})}
										</div>

										{isAuth() && item.user && isAuth().user.id === item.user._id && (
											<div className="ml-4">
												<span
													onClick={() => handleDeleteReview(item._id)}
													className="text-sm cursor-pointer select-none"
												>
													<BsTrash />
												</span>
											</div>
										)}
									</div>
								</div>
								<div className="mb-6 text-xs text-black/50 space-x-2">
									<span>{item.user.userName ? item.user.userName : ''}</span>
									<span>-</span>
									<span>{dayjs(item.createdAt).format('DD/MM/YYYY')}</span>
								</div>
								<div>
									<p className="text-base font-medium">{item.review}</p>
								</div>
							</div>
						);
					})
				) : (
					<div>No user review</div>
				)}
			</div>
		</div>
	);
};

export default ReviewDisplay;
