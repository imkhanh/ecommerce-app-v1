import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllProducts = async (page) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/product/get-all?limit=${page * 8}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/category/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsByFilters = async (arg) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/product/search/filters`, arg);
    return res;
  } catch (error) {
    console.log(error);
  }
};
