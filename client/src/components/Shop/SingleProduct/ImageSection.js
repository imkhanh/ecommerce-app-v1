import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageSection = ({ product, currentImage, handleChangeSlide }) => {
	return (
		<div className="hidden md:block md:mb-8 relative">
			<div className="absolute left-4 bottom-4 z-10">
				<p className="text-sm text-center w-16 h-6 flex items-center justify-center bg-white rounded-full shadow-md ">
					{currentImage + 1} / {product.images.length}
				</p>
			</div>
			<div>
				<span onClick={() => handleChangeSlide('prev')} className="custom-button left-2">
					<BsChevronLeft />
				</span>
				<Zoom zoomMargin={40}>
					<img
						src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`}
						alt={product.name}
						className="h-[640px] md:h-full w-[740px] object-cover"
					/>
				</Zoom>
				<span onClick={() => handleChangeSlide('next')} className="custom-button right-2">
					<BsChevronRight />
				</span>
			</div>
		</div>
	);
};

export default ImageSection;
