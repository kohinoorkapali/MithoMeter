import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (method, endpoint, options = {}) => {
  const { data, params, headers } = options;
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      throw new Error("Server not reachable!");
    }
  }
};

export const apiUpload = async (endpoint, formData, extraHeaders = {}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extraHeaders,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      throw new Error("Server not reachable!");
    }
  }
};
