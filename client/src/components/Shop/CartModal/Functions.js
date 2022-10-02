import { cartList } from '../SingleProduct/Functions';

export const totalPrice = () => {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	let total = 0;
	cart.forEach((item) => {
		total += item.quantity * item.price;
	});
	return total;
};

export const subTotalPrice = (id, price) => {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	let total = 0;
	cart.forEach((item) => {
		if (item.id === id) {
			total = item.quantity * price;
		}
	});
	return total;
};

export const totalQuantity = (id) => {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	let total = 0;
	cart.forEach((item) => {
		if (item.id === id) {
			total = item.quantity;
		}
	});
	return total;
};

export const updateQuantity = (type, id, dispatch) => {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (type === 'increase') {
		cart.forEach((item) => {
			if (item.id === id) {
				return (item.quantity += 1);
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
		dispatch({ type: 'inCart', payload: cartList() });
	} else if (type === 'decrease') {
		cart.forEach((item) => {
			if (item.id === id) {
				return item.quantity === 1 ? item.quantity : (item.quantity -= 1);
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
		dispatch({ type: 'inCart', payload: cartList() });
	}
};
