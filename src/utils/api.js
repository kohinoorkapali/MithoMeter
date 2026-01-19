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
export const apiUpload = async (endpoint, formData, method = "POST", extraHeaders = {}) => {
  const token = localStorage.getItem("token"); // get JWT token if available

  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method, // POST, PATCH, PUT, etc.
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extraHeaders,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Return the message from backend if available
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      throw new Error("Server not reachable!");
    }
  }
};
