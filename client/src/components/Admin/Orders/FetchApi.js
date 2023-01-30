import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllOrders = async () => {
  try {
    const res = axios.get(`${BASE_URL}/api/order/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (orderData) => {
  try {
    const res = axios.patch(`${BASE_URL}/api/order/update-order/${orderData.id}`, orderData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = axios.delete(`${BASE_URL}/api/order/delete-order/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
