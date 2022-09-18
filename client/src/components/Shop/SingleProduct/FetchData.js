import axios from 'axios';

export const getSingleProduct = async (id) => {
	try {
		const res = await axios.get(`/api/product/get-single/${id}`);

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
		const res = await axios.post('/api/product/add-cart', { cartArr });

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postAddReview = async (formData) => {
	try {
		const res = await axios.post('/api/product/add-review', formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postDeleteReview = async (formData) => {
	try {
		const res = await axios.post('/api/product/delete-review', formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};
