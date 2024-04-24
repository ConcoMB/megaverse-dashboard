import Axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default axiosInstance;
