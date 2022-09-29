import axios from 'axios';

export const getAllProducts = async () => axios.get('/api/product/get-all');
