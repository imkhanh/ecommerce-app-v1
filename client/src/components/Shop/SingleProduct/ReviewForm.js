import React, { useContext, useState } from 'react';
import { postAddReview } from './FetchData';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from './FetchData';
import { LayoutContext } from '../Layout/Layout';
import ReactStars from 'react-rating-stars-component';
import { BsStarFill } from 'react-icons/bs';
import { isAuth } from '../Auth/Authentication';

const RatingReviewForm = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const [data, setData] = useState({ proId: id, review: '', rating: '', error: null, success: null });

	const alert = (type, msg) => (
		<div className={`px-2 h-10 flex items-center bg-${type}-100 text-${type}-500`}>
			<p className="text-sm">{msg}</p>
		</div>
	);

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
		} catch (error) {
			console.log(error);
		}
	};

	const handlePostReivew = async () => {
		let formData = {
			userId: JSON.parse(localStorage.getItem('auth')).user._id,
			proId: data.proId,
			rating: data.rating,
			review: data.review,
		};
		try {
			const res = await postAddReview(formData);
			if (res.data.success) {
				setData({ ...data, review: '', rating: '', error: null, success: res.data.success });
				fetchData();
				setTimeout(() => {
					setData({ ...data, review: '', rating: '', error: null, success: null });
				}, 2000);
			} else {
				setData({ ...data, review: '', rating: '', error: res.data.error, success: null });
				setTimeout(() => {
					setData({ ...data, review: '', rating: '', error: null, success: null });
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const isReview = state.singleProduct.ratingReviews.map((item) => {
		return item.user ? item.user._id : '';
	});

	return (
		<>
			{isReview.includes(isAuth().user?._id) ? (
				''
			) : (
				<div className="mb-8 flex flex-col space-y-2">
					<div className="flex flex-col">
						<span className="text-lg font-medium">Add a review</span>
						<span className="text-gray-400 text-sm italic font-light">Your email address will not be published. Required fields are marked *</span>
					</div>
					<div>
						<ReactStars
							count={5}
							onChange={(newRating) => setData({ ...data, rating: newRating })}
							size={16}
							fullIcon={<BsStarFill />}
							activeColor="#ffd700"
						/>
					</div>
					{data.error && alert('red', data.error)}
					{data.success && alert('green', data.success)}
					<div className="space-y-2">
						<textarea
							rows={5}
							name="review"
							value={data.review}
							onChange={(e) => setData({ ...data, review: e.target.value })}
							placeholder="Write a review"
							className="py-1 px-2 text-sm w-full h-auto bg-white border border-black/10 rounded-md outline-none focus:border-black duration-200 ease-in-out"
						/>
						<button type="button" onClick={() => handlePostReivew()} className="py-[10px] px-4 bg-black text-white font-medium text-sm rounded-md">
							Post Review
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default RatingReviewForm;
