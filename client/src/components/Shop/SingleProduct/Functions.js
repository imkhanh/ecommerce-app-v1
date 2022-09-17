export const nextSlide = (images, currentImage, setCurrentImage) => (currentImage < images.length - 1 ? setCurrentImage(currentImage + 1) : setCurrentImage(0));

export const prevSlide = (images, currentImage, setCurrentImage) =>
	currentImage === 0 ? setCurrentImage(images.length - 1) : setCurrentImage(currentImage - 1);

export const updateQuantity = (type, qty, setQty, totalQty) => {
	if (type === 'descrease') {
		if (qty === 1) {
			setQty(1);
		} else {
			setQty(qty - 1);
		}
	} else if (type === 'increase') {
		if (qty < totalQty) {
			setQty(qty + 1);
		} else if (qty === totalQty) {
			return;
		}
	}
};

export const cartList = () => {
	let list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		for (const c of cart) {
			list.push(c.id);
		}
		return list;
	} else {
		return (list = []);
	}
};

export const inCart = (id) => {
	if (localStorage.getItem('cart')) {
		const cartArr = JSON.parse(localStorage.getItem('cart'));
		for (const cart of cartArr)
			if (cart.id === id) {
				return true;
			}
	}
};

export const addToCart = (id, qty, price, setQty, dispatch, fetchData) => {
	let inCart = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			if (item.id === id) {
				inCart = true;
			}
		});

		if (!inCart) {
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

export const totalPrice = () => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			total += item.price * item.qty;
		});
	}
	return total;
};

export const totalQuantity = (id) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			if (item.id === id) {
				total = item.qty;
			}
		});
	}
	return total;
};

export const subTotalPrice = (id, price) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			if (item.id === id) {
				total = item.qty * price;
			}
		});
	}
	return total;
};
