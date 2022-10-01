import React, { useContext, useState } from 'react';
import { isAuth } from '../AuthModal/Authenticated';
import { LayoutContext } from '..';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewDisplay';

const RatingReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [menu, setMenu] = useState(false);

	const product = state.singleProduct;

	return (
		<div className="py-24">
			<div className="py-4 flex items-center justify-center border-y border-black/10 space-x-4 select-none">
				<div onClick={() => setMenu(true)} className="cursor-pointer">
					<span
						className={`${
							menu ? 'text-black' : 'text-black/50'
						} uppercase hover:text-black text-xs transition-colors`}
					>
						Description
					</span>
				</div>
				<div className="text-black/50 font-light">/</div>
				<div onClick={() => setMenu(false)} className="relative cursor-pointer">
					<span
						className={`${
							!menu ? 'text-black' : 'text-black/50'
						} uppercase  hover:text-black text-xs transition-colors`}
					>
						Reviews
					</span>
					<span className="absolute -top-3 -right-4 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm border-2 border-white">
						0
					</span>
				</div>
			</div>
			<div className="p-8 lg:p-4 flex flex-col space-y-8">
				{menu ? (
					<div>
						<p className="text-base text-justify">{product && product.description}</p>
						<div className="max-w-4xl mx-auto w-full space-y-4">
							{product.images.length > 0 &&
								product.images.map((img, index) => {
									return (
										<img
											key={index}
											alt={product.name}
											src={`http://localhost:3000/uploads/products/${img}`}
											className="w-full h-full object-cover"
										/>
									);
								})}
						</div>
					</div>
				) : (
					<>
						{isAuth() ? (
							<div>
								<p
									onClick={() => dispatch({ type: 'authToggle', payload: true })}
									className="cursor-pointer select-none underline underline-offset-4 font-medium"
								>
									Write a review
								</p>
							</div>
						) : (
							<ReviewForm />
						)}
						<ReviewDisplay />
					</>
				)}
			</div>
		</div>
	);
};

export default RatingReviews;
