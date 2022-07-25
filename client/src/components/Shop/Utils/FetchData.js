import axios from 'axios';

export const getDataApi = async (url) => {
	const res = await axios.get(`/api/${url}`);
	return res;
};

export const postDataApi = async (url, data) => {
	const res = await axios.post(`/api/${url}`, data);
	return res;
};
