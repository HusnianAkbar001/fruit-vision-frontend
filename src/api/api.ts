
import axios from "axios";

// Determine the base URL based on environment
// In production or Lovable environment, we'll use a mock API
const isLocalDevelopment = window.location.hostname === "localhost";
const apiBaseURL = isLocalDevelopment ? "http://localhost:5000" : "/api";

// Base API configuration
const API = axios.create({
  baseURL: apiBaseURL,
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
export const registerUser = async (username: string, password: string, email: string) => {
  try {
    const userData = { 
      username, 
      password,
      email
    };
    
    console.log("Sending registration data:", userData);
    
    // If not local development, mock the registration response
    if (!isLocalDevelopment) {
      console.log("Using mock registration API");
      // Mock successful registration
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return { success: true, message: "Registration successful" };
    }
    
    const response = await API.post("/register", userData);
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response || error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    // If not local development, mock the login response
    if (!isLocalDevelopment) {
      console.log("Using mock login API");
      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return { 
        token: "mock-jwt-token-" + username, 
        user: { username },
        message: "Login successful"
      };
    }
    
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
    
    // If not local development, mock the prediction response
    if (!isLocalDevelopment) {
      console.log("Using mock prediction API");
      // Mock successful prediction
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      return {
        prediction: {
          class: "ripe_apple",
          probability: 0.94,
          class_info: {
            fruit_type: "apple",
            ripeness: "ripe"
          }
        },
        metrics: {
          precision: 0.92,
          recall: 0.89,
          f1_score: 0.90,
          accuracy: 0.88
        },
        visualizations: {
          class_distribution: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          confusion_matrix: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          accuracy_graph: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        }
      };
    }
    
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
