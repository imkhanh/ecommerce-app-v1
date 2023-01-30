import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllUsers = async () => {
  try {
    const res = axios.get(`${BASE_URL}/api/user/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const register = async ({ fullName, userName, email, password }) => {
  try {
    const res = axios.post(`${BASE_URL}/api/register`, { fullName, userName, email, password });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (id) => {
  try {
    const res = axios.get(`${BASE_URL}/api/user/get-single-user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = axios.delete(`${BASE_URL}/api/user/delete-user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
