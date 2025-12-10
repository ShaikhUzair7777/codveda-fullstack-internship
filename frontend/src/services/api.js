import axios from "axios";

// ⭐ Correct Render backend URL including /api/products
const API = axios.create({
  baseURL: "https://codveda-backend.onrender.com/api/products",
});

// Get all products
export const getProducts = () => API.get("/");

// Add product
export const createProduct = (data) => API.post("/", data);

// Get a single product
export const getProduct = (id) => API.get(`/${id}`);

// Update product
export const updateProduct = (id, data) => API.put(`/${id}`, data);

// Delete product
export const deleteProduct = (id) => API.delete(`/${id}`);
