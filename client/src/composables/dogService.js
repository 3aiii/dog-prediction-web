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
