import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllSlideImages = async () => {
  try {
    const res = axios.get(`${BASE_URL}/api/customize/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDocuments = async () => {
  try {
    const res = axios.get(`${BASE_URL}/api/customize/get-all-documents`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadSlideImage = async (formData) => {
  try {
    const res = axios.post(`${BASE_URL}/api/customize/upload-slide`, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSlideImage = async (id) => {
  try {
    const res = axios.delete(`${BASE_URL}/api/customize/delete-slide/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
