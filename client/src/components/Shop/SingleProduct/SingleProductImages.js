import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { nextSlide, prevSlide } from './Functions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SingleProductImages = ({ product }) => {
	const [currentImage, setCurrentImage] = useState(0);

	return (
		<div className="md:p-4 w-1/2 md:w-full border-r border-black/10 select-none">
			<div className="md:hidden grid grid-cols-1 gap-2">
				{product.images.length > 0 &&
					product.images.map((img, index) => (
						<div key={index}>
							{index === currentImage && (
								<img alt={product.name} src={`http://localhost:3000/uploads/products/${img}`} className="w-full h-full object-cover" />
							)}
						</div>
					))}
			</div>
			<div className="hidden md:block relative">
				<img alt={product.name} src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`} className="w-full h-full object-cover" />
				<div className="absolute right-4 bottom-4">
					<span className="font-bold">
						{currentImage + 1} / {product.images.length}
					</span>
				</div>
				<span
					onClick={() => prevSlide(currentImage, setCurrentImage, product.images)}
					className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-transparent text-black/50 hover:bg-gray-100 hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out"
				>
					<BsChevronLeft className="text-xl" />
				</span>
				<span
					onClick={() => nextSlide(currentImage, setCurrentImage, product.images)}
					className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-transparent text-black/50 hover:bg-gray-100 hover:text-black flex justify-center items-center rounded-full cursor-pointer duration-200 ease-in-out"
				>
					<BsChevronRight className="text-xl" />
				</span>
			</div>
		</div>
	);
};

export default SingleProductImages;
