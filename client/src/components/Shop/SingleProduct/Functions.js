export const changeSlide = (type, currentImage, setCurrentImage, images) => {
	if (type === 'nextSlide') {
		setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
	} else if (type === 'prevSlide') {
		setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
	}
};

export const updateQuantity = (type, quantity, setQuantity, totalQuatity, setAlert) => {
	if (type === 'increase') {
		if (quantity === totalQuatity) {
			setAlert(true);
		} else if (quantity < totalQuatity) {
			setQuantity(quantity + 1);
		}
	} else if (type === 'decrease') {
		if (quantity === 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
			setAlert(false);
		}
	}
};
