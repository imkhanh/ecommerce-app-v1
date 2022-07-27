import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const ImageSection = ({ product, currentImage, handleChangeSlide }) => {
	return (
		<div className="hidden md:block md:mb-8 relative">
			<div className="absolute left-4 bottom-4 z-10">
				<p className="text-sm text-center w-16 h-6 flex items-center justify-center bg-white rounded-full shadow-sm">
					{currentImage + 1} / {product.images.length}
				</p>
			</div>
			<div>
				<span onClick={() => handleChangeSlide('prev')} className="slide-button left-2">
					<BsChevronLeft />
				</span>
				<img src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`} alt={product.name} className="h-[640px] md:h-full w-[740px] object-cover" />
				<span onClick={() => handleChangeSlide('next')} className="slide-button right-2">
					<BsChevronRight />
				</span>
			</div>
		</div>
	);
};

export default ImageSection;
