import axios from 'axios';

export const getAllOrders = async () => {
	try {
		const res = axios.get('/api/order/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const updateOrder = async (orderData) => {
	try {
		const res = axios.patch(`/api/order/update-order/${orderData.id}`, orderData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteOrder = async (id) => {
	try {
		const res = axios.delete(`/api/order/delete-order/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
