import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllCategories = async () => {
  try {
    const res = axios.get(`${BASE_URL}/api/category/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postAddCategory = async ({ name, description, status }) => {
  try {
    const res = axios.post(`${BASE_URL}/api/category/add-category`, { name, description, status });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async ({ id, name, description, status }) => {
  try {
    const res = axios.patch(`${BASE_URL}/api/category/edit-category/${id}`, {
      name,
      description,
      status,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = axios.delete(`${BASE_URL}/api/category/delete-category/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
