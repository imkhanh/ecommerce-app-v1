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

export const postAddReview = async (formData) => {
	try {
		const res = await axios.post(`/product/add-review`, formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postDeleteReview = async (formData) => {
	try {
		const res = await axios.post(`/product/delete-review`, formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};
