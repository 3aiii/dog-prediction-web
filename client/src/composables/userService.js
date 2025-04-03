import { HOST_URL } from "./../secret";
import axios from "./../../node_modules/axios/lib/axios";

export const get = async (endpoint, params = {}) => {
  return await axios.get(`${HOST_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  });
};

export const login = async (email, password) => {
  return await axios.post(
    `${HOST_URL}/user/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const logout = async () => {
  return await axios.post(
    `${HOST_URL}/user/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const verify = async () => {
  return await axios.post(
    `${HOST_URL}/user/verify`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/user`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const gets = async (page, limit) => {
  return get("user", { page, limit });
};

export const update = async (id, data) => {
  return await axios.put(`${HOST_URL}/user/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
