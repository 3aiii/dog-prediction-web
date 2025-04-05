import { HOST_URL } from "../secret";
import axios from "./../../node_modules/axios/lib/axios";
import { get } from "./userService";

export const gets = async () => {
  return get(`dog`);
};

export const predict = async (id, model, data) => {
  return await axios.post(`${HOST_URL}/predict/${id}?model=${model}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const top5 = async () => {
  return await get(`predict/top-5`);
};

export const history = async (currentPage, itemsPerPage) => {
  return await get(`predict/history?page=${currentPage}&limit=${itemsPerPage}`);
};

export const getHistory = async (id) => {
  return await get(`predict/${id}`);
};
