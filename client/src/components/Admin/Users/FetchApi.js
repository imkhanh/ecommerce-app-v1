import axios from 'axios';

export const getAllUsers = async () => {
	try {
		const res = axios.get('/api/user/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const register = async ({ fullName, userName, email, password }) => {
	try {
		const res = axios.post('/api/register', { fullName, userName, email, password });
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getSingleUser = async (id) => {
	try {
		const res = axios.get(`/api/user/get-single-user/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (id) => {
	try {
		const res = axios.delete(`/api/user/delete-user/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
