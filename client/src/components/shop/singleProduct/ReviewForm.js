import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAuth } from '../auth/Authenticated';
import { LayoutContext } from '..';
import { getSingleProduct, postAddReview } from './FetchApi';

const ReviewForm = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const [data, setData] = useState({ pId: id, title: '', review: '', rating: '', success: '', error: '' });

	const fetchSingleProduct = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.data.product });
		} catch (error) {
			console.log(error);
		}
	};

	const handlePostReview = async () => {
		let formData = {
			uId: JSON.parse(localStorage.getItem('auth')).user._id,
			pId: data.pId,
			title: data.title,
			review: data.review,
			rating: data.rating,
		};
		try {
			const res = await postAddReview(formData);
			if (res && res.data.success) {
				fetchSingleProduct();
				setData({ ...data, pId: id, title: '', review: '', rating: '', success: res.data.success, error: false });
			} else {
				setData({ ...data, pId: id, title: '', review: '', rating: '', success: false, error: res.data.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, pId: id, title: '', review: '', rating: '', success: false, error: false });
		}, 2000);
	}

	const alert = (type, msg) => (
		<div className={`p-2 text-sm bg-${type}-100 text-${type}-500`}>
			<p>{msg}</p>
		</div>
	);

	const isReviewList = state.singleProduct.reviews.map((item) => {
		return item.user._id ? item.user._id : '';
	});

	return (
		<>
			{isReviewList.includes(isAuth().user._id) ? (
				''
			) : (
				<div className="flex flex-col space-y-2">
					<div className="flex flex-col space-y-2">
						<span className="text-2xl font-medium">Add a review</span>
						<span className="italic font-light text-gray-500 text-sm">Your email address will not be published. Required fields are marked *</span>
					</div>
					{data.error && alert('red', data.error)}
					{data.success && alert('green', data.success)}
					<div>
						<fieldset className="rating" onChange={(e) => setData({ ...data, rating: e.target.value })}>
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
					<div className="space-y-4">
						<div>
							<label htmlFor="title" className="block mb-1 text-sm">
								Title
							</label>
							<input
								type="text"
								name="title"
								value={data.title}
								onChange={(e) => setData({ ...data, title: e.target.value })}
								placeholder="Please enter your title"
								className="px-2 text-sm w-full h-10 text-black outline-none border border-gray-300 focus:border-black placeholder:text-sm rounded-sm duration-200 ease-in-out"
							/>
						</div>
						<div>
							<label htmlFor="review" className="block mb-1 text-sm">
								Content
							</label>
							<textarea
								rows={4}
								name="review"
								value={data.review}
								onChange={(e) => setData({ ...data, review: e.target.value })}
								placeholder="Please enter your review"
								className="p-2 text-sm w-full text-black outline-none border border-gray-300 focus:border-black 
								placeholder:text-sm rounded-sm duration-200 ease-in-out"
							/>
						</div>
						<div>
							<button type="button" onClick={() => handlePostReview()} className="py-2 px-4 text-sm font-medium bg-black text-white rounded-full">
								Post review
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ReviewForm;
