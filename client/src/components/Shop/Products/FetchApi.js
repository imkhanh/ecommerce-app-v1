import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const res = await axios.get('/product/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};
export const getAllCategories = async () => {
	try {
		const res = await axios.get('/category/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};
