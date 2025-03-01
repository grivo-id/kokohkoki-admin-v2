import axios from "axios";
import { API_URL } from "../utils/baseURL/API_URL";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
  }
});