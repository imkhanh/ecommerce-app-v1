import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSingleProduct = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/product/get-single-product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getListProduct = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/product/get-list-related/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postAddToCart = async () => {
  const cartProduct = [];
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  if (cart) {
    for (const c of cart) {
      cartProduct.push(c.id);
    }
  }

  try {
    const res = await axios.post(`${BASE_URL}/api/product/add-cart`, { cartProduct });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/product/add-review`, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletReview = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/product/delete-review`, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};
