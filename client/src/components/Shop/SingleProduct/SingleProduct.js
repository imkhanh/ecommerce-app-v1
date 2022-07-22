import React from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import RatingReviews from './RatingReviews';

const SingleProductSection = () => {
	return (
		<section className="max-w-[73rem] w-full mx-auto h-[2000px] p-12 lg:p-8 md:p-4 transition-all">
			<div className="mb-8 flex items-center text-xs font-light text-black/70 space-x-1">
				<Link to="/" className="text-black font-normal">
					Home
				</Link>
				<span>|</span>
				<Link to="/" className="hover:text-black">
					Product
				</Link>
			</div>
			<div className="flex md:flex-col space-x-6 lg:space-x-4 md:space-x-0 md:space-y-6 transition-all">
				<div className="w-4/6 lg:w-1/2 md:w-full grid grid-cols-2 lg:grid-cols-1 gap-3 transition-all">
					<figure>
						<img src="https://image.thanhnien.vn/w1024/Uploaded/2022/zngujt/2021_08_14/training_11_08_2021__291628703763241_medium_sarx.jpg" alt="" className="h-full w-full object-cover" />
					</figure>
					<figure>
						<img src="https://image.thanhnien.vn/w1024/Uploaded/2022/zngujt/2021_08_14/training_11_08_2021__291628703763241_medium_sarx.jpg" alt="" className="h-full w-full object-cover" />
					</figure>
				</div>
				<div className="w-2/6 lg:w-1/2 md:w-full sticky top-16 transition-all">Product</div>
			</div>
			<RatingReviews />
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;
