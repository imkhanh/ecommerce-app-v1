import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postAddReview, getSingleProduct } from './FetchApi';
import { LayoutContext } from '..';
import './style.css';
import { isAuth } from '../AuthModal/Authenticated';

const ReviewForm = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const [data, setData] = useState({
		pId: id,
		uId: '',
		title: '',
		rating: '',
		review: '',
		error: '',
		success: '',
	});

	const fetchSingleProduct = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, error: false, success: false });
		}, 2000);
	}

	const handleAddReview = async () => {
		const formData = {
			pId: data.pId,
			uId: JSON.parse(localStorage.getItem('auth')).user.id,
			title: data.title,
			rating: data.rating,
			review: data.review,
		};

		try {
			const res = await postAddReview(formData);
			if (res && res.data.success) {
				fetchSingleProduct();
				setData({ ...data, uId: '', title: '', rating: '', review: '', error: false, success: res.data.success });
			} else {
				setData({ ...data, uId: '', title: '', rating: '', review: '', error: res.data.error, success: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkRatingReview = state.singleProduct.reviews.map((item) => {
		return item.user ? item.user._id : '';
	});

	return (
		<>
			{checkRatingReview.includes(isAuth().user.id) ? (
				<div>
					<span className="text-base font-medium">You already reviewed this product</span>
				</div>
			) : (
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<span className="text-2xl font-medium">Add a review</span>
						<span className="text-black/50 italic font-light text-sm">
							Your email address will not be published. Required fields are marked *
						</span>
					</div>
					<div>
						<fieldset className="rating space-x-2" onChange={(e) => setData({ ...data, rating: e.target.value })}>
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
					{data.error && (
						<div className="px-2 py-3 text-sm font-medium bg-red-100 text-red-700 border-l-4 border-red-700">
							{data.error}
						</div>
					)}
					{data.success && (
						<div className="px-2 py-3 text-sm font-medium bg-green-100 text-green-700 border-l-4 border-green-700">
							{data.success}
						</div>
					)}
					<div>
						<span className="mb-1 text-sm block">Title</span>
						<input
							type="text"
							name="title"
							value={data.title}
							onChange={(e) => setData({ ...data, title: e.target.value })}
							placeholder="Write a title"
							className="px-2 text-sm h-10 w-full border border-black/10 outline-none focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</div>
					<div>
						<span className="mb-1 text-sm block">Review</span>
						<textarea
							rows={5}
							placeholder="Write a review"
							name="review"
							value={data.review}
							onChange={(e) => setData({ ...data, review: e.target.value })}
							className="p-2 text-sm w-full outline-none border border-black/10 focus:border-black rounded-sm duration-200 ease-in-out"
						/>
					</div>
					<div>
						<button
							type="button"
							onClick={() => handleAddReview()}
							className="px-6 py-2 bg-black text-white text-sm font-medium rounded-full"
						>
							Post Review
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ReviewForm;
