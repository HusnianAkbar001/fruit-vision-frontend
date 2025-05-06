
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization header to requests if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = async (username: string, password: string, email?: string) => {
  try {
    const userData = { 
      username, 
      password,
      ...(email && { email }) // Add email to request if provided
    };
    
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await API.post("/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }
    throw new Error("No token received");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Prediction API
export const predictImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    
    // Override default content-type to allow multipart/form-data
    const response = await API.post("/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Prediction failed");
  }
};
