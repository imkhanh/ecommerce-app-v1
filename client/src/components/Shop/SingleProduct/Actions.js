export const handleChangeSlide = (type, currentImage, images, setCurrentImage) => {
	if (type === 'next') {
		setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
	} else if (type === 'prev') {
		setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
	}
};

export const handleUpdateQuantity = (type, qty, quantity, setQty, setAlert) => {
	if (type === 'decrease') {
		if (qty === 1) {
			setQty(1);
		} else {
			setQty(qty - 1);
			setAlert(false);
		}
	} else if (type === 'increase') {
		if (qty === quantity) {
			setQty(quantity);
			setAlert(true);
		} else {
			setQty(qty + 1);
		}
	}
};

export const cartList = () => {
	const list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	if (cart !== null) {
		for (const c of cart) {
			list.push(c.id);
		}
		return list;
	} else {
		return list === null;
	}
};

export const inCart = (id) => {
	if (localStorage.getItem('cart')) {
		const cartProduct = JSON.parse(localStorage.getItem('cart'));
		for (const cart of cartProduct) {
			if (cart.id === id) {
				return true;
			}
			return false;
		}
	}
};

export const addToCart = (id, qty, price, setQty, dispatch, fetchSingleProduct) => {
	let isObj = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			if (item.id === id) {
				isObj = true;
			}
		});
		if (!isObj) {
			cart.push({ id, qty, price });
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	} else {
		cart.push({ id, qty, price });
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	setQty(1);
	dispatch({ type: 'inCart', payload: cartList() });
	fetchSingleProduct();
};
