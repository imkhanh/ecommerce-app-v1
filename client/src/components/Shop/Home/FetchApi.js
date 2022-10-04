import axios from 'axios';

export const getAllImages = async () => {
	try {
		const res = await axios.get('/api/customize/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};
