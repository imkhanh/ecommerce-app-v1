import axios from 'axios';

export const getBraintreeToken = async () => {
	try {
		const res = await axios.get('/api/braintree/get-token');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getPaymentProcess = async (paymentdata) => {
	try {
		const res = await axios.post('/api/braintree/payment', paymentdata);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const createOrder = async (orderData) => {
	try {
		const res = await axios.post('/api/order/create-order', orderData);
		return res;
	} catch (error) {
		console.log(error);
	}
};
