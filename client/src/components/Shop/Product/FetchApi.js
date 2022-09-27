import axios from 'axios';

export const getSingleProduct = async (id) => {
	try {
		const res = await axios.get(`/api/product/get-single-product/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
