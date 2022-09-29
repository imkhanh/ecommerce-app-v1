import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const res = axios.get('/api/product/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getAllCategories = async () => {
	try {
		const res = axios.get('/api/category/get-all');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id) => {
	try {
		const res = axios.delete(`/api/product/delete-product/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const postAddProduct = async ({
	name,
	category,
	description,
	brand,
	images,
	price,
	quantity,
	offer,
	status,
	shipping,
}) => {
	const formData = new FormData();

	for (const img of images) {
		formData.append('images', img);
	}

	formData.append('name', name);
	formData.append('category', category);
	formData.append('description', description);
	formData.append('brand', brand);
	formData.append('price', price);
	formData.append('quantity', quantity);
	formData.append('offer', offer);
	formData.append('status', status);
	formData.append('shipping', shipping);

	try {
		const res = await axios.post('/api/product/add-product', formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const editProduct = async (product) => {
	console.log(product);
	const formData = new FormData();

	if (product.editImages) {
		for (const img of product.editImages) {
			formData.append('editImages', img);
		}
	}

	formData.append('id', product.id);
	formData.append('name', product.name);
	formData.append('category', product.category._id);
	formData.append('description', product.description);
	formData.append('brand', product.brand);
	formData.append('price', product.price);
	formData.append('quantity', product.quantity);
	formData.append('offer', product.offer);
	formData.append('status', product.status);
	formData.append('shipping', product.shipping);
	formData.append('images', product.images);

	try {
		const res = await axios.patch(`/api/product/edit-product/${product.id}`, formData);
		return res;
	} catch (error) {
		console.log(error);
	}
};
