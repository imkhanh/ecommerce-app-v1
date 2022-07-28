import axios from 'axios';

export const getAllProduct = async () => {
	try {
		const res = await axios.get('/api/product/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getAllCategories = async () => {
	try {
		const res = await axios.get('/api/category/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};
