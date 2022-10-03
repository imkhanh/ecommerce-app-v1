import axios from 'axios';

export const getSingleUser = async (id) => {
	try {
		const res = await axios.get(`/api/user/get-single-user/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getOrderByUser = async (id) => {
	try {
		const res = await axios.get(`/api/order/order-by-user/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const patchEditUser = async (formData) => {
	try {
		const res = await axios.patch(`/api/user/edit-user/${formData.id}`, formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const changePassword = async (formData) => {
	try {
		const res = await axios.post(`/api/user/change-password`, formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postAddToWish = async () => {
	const wishProduct = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [];

	try {
		const res = await axios.post(`/api/product/add-wish`, { wishProduct });
		return res;
	} catch (error) {
		console.log(error);
	}
};
