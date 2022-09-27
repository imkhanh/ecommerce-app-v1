import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const res = await axios.get('/api/product/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};
