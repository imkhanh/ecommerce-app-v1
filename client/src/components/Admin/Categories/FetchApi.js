import axios from 'axios';

export const getAllCategories = async () => {
	try {
		const res = axios.get('/api/category/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postAddCategory = async ({ name, description, status }) => {
	try {
		const res = axios.post('/api/category/add-category', { name, description, status });
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const editCategory = async ({ id, name, description, status }) => {
	try {
		const res = axios.patch(`/api/category/edit-category/${id}`, { name, description, status });
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id) => {
	try {
		const res = axios.delete(`/api/category/delete-category/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
