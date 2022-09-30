import axios from 'axios';

export const getAllSlideImages = async () => {
	try {
		const res = axios.get('/api/customize/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getAllDocuments = async () => {
	try {
		const res = axios.get('/api/customize/get-all-documents');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const uploadSlideImage = async (formData) => {
	try {
		const res = axios.post('/api/customize/upload-slide', formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteSlideImage = async (id) => {
	try {
		const res = axios.delete(`/api/customize/delete-slide/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
