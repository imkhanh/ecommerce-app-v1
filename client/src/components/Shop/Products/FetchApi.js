import axios from 'axios';

export const getAllProducts = async () => await axios.get('/api/product/get-all');
export const getAllCategories = async () => await axios.get('/api/category/get-all');
export const getProductsByFilters = async (arg) => await axios.post('/api/product/search/filters', arg);
