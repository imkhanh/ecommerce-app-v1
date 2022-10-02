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

export const inCart = (id) => {
	if (localStorage.getItem('cart')) {
		const cartProduct = JSON.parse(localStorage.getItem('cart'));
		for (const cart of cartProduct) {
			if (cart.id === id) {
				return true;
			}
		}
	}
	return false;
};

export const cartList = () => {
	let list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

	if (cart !== null) {
		for (const c of cart) {
			list.push(c.id);
		}
		return list;
	} else {
		return list === null;
	}
};

export const addToCart = (id, quantity, price, setQuantity, dispatch, fetchData) => {
	let inCart = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		cart.forEach((item) => {
			if (item.id === id) {
				inCart = true;
			}
		});
		if (!inCart) {
			cart.push({ id, quantity, price });
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	} else {
		cart.push({ id, quantity, price });
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	setQuantity(1);
	dispatch({ type: 'inCart', payload: cartList() });
	fetchData();
};
