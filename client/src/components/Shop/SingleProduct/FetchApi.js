import axios from 'axios';

export const getSingleProduct = async (id) => {
	try {
		const res = await axios.get(`/product/get-single-product/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getListRelated = async (id) => {
	try {
		const res = await axios.get(`/product/get-list-related/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postAddToCart = async () => {
	const cartArr = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		for (const c of cart) {
			cartArr.push(c.id);
		}
	}

	try {
		const res = await axios.post(`/product/add-to-cart`, { cartArr });
		return res;
	} catch (error) {
		console.log(error);
	}
};
