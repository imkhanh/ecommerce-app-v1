import axios from 'axios';

export const login = async ({ email, password }) => {
	try {
		const res = await axios.post('/api/login', { email, password });
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const register = async (data) => {
	try {
		const res = await axios.post('/api/register', { data });
		return res;
	} catch (error) {
		console.log(error);
	}
};
