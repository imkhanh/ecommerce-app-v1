import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllImages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/customize/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
