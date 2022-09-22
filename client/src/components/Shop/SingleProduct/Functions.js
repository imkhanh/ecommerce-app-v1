export const nextSlide = (currentImage, setCurrentImage, images) => setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);

export const prevSlide = (currentImage, setCurrentImage, images) => setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);

export const updateQuantity = (type, qty, setQty, totalQty, setAlert) => {
	if (type === 'decrease') {
		if (qty === 1) {
			setQty(1);
		} else {
			setQty(qty - 1);
			setAlert(false);
		}
	} else if (type === 'increase') {
		if (qty < totalQty) {
			setQty(qty + 1);
		} else if (qty === totalQty) {
			setAlert(true);
		}
	}
};

export const inCart = (id) => {};

export const cartList = () => {};

export const addToCart = () => {};
