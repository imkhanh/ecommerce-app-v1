export const isWish = (id, wishList) => {
	if (wishList !== null && wishList.includes(id)) {
		return true;
	} else {
		return false;
	}
};

export const addToWishList = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];
	if (list.length > 0) {
		if (!list.includes(id)) {
			list.push(id);
			setWishList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	} else {
		list.push(id);
		setWishList(list);
		localStorage.setItem('wish', JSON.stringify(list));
	}
};

export const removeToWishList = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];
	if (list.length > 0) {
		if (list.includes(id)) {
			list.splice(list.indexOf(id), 1);
			setWishList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	}
};

export const cartList = () => {
	let list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart !== null) {
		for (const c of cart) {
			list.push(c._id);
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
			if (cart._id === id) return true;
		}
	}
};

export const handleAddToCart = (id, qty, price, color, size, setQty, setColor, setSize, setAlert, dispatch, fetchSingleProduct) => {
	let isCart = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (!size || !color) {
		setAlert(true);
	} else if (cart) {
		cart.forEach((item) => {
			if (item._id === id) {
				isCart = true;
			}
		});

		if (!isCart) {
			cart.push({ id, qty, price, color, size });
			localStorage.setItem('cart', JSON.stringify(cart));
		}

		setColor('');
		setSize('');
		setQty(1);
		setAlert(false);

		dispatch({ type: 'inCart', payload: cartList() });
		fetchSingleProduct();
	} else {
		cart.push({ id, qty, price, color, size });
		localStorage.setItem('cart', JSON.stringify(cart));
	}
};
