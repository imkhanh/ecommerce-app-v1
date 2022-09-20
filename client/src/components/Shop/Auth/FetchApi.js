import axios from 'axios';

export const login = async ({ email, password }) => {
	try {
		const res = await axios.post('/login', { email, password });
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const register = async ({ fullName, userName, email, password }) => {
	try {
		const res = await axios.post('/login', { fullName, userName, email, password });
		return res;
	} catch (error) {
		console.log(error);
	}
};
