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

export const inCart = (id) => {
	if (localStorage.getItem('cart')) {
		const cart = JSON.parse(localStorage.getItem('cart'));
		cart.forEach((item) => {
			if (item.id === id) {
				return true;
			}
		});
	}
};

export const cartList = () => {
	let list = [];
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

export const addToCart = (id, qty, price, setQty, dispatch, fetchData) => {
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
	fetchData();
};
