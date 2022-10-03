import axios from 'axios';

export const getAllProducts = async (sort, order, page) => {
	try {
		const res = await axios.get('/api/product/get-all', { sort, order, page });
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

export const getAllProductsByFilters = async (arg) => {
	try {
		const res = await axios.post('/api/product/search/filters', arg);
		return res;
	} catch (error) {
		console.log(error);
	}
};
