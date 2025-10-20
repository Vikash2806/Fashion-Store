import axios from "axios";

// Base API URL (from .env or fallback)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// -------------------- DRESS API --------------------

// Get all dresses
export const getDresses = async () => {
  const res = await axios.get(`${API_BASE}/api/dresses`);
  return res.data;
};

// Create a new dress
export const createDress = async (dress, token) => {
  const res = await axios.post(`${API_BASE}/api/dresses`, dress, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update an existing dress
export const updateDress = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/api/dresses/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a dress
export const deleteDress = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/api/dresses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- ADMIN AUTH --------------------

// Login as admin
export const adminLogin = async (password) => {
  const res = await axios.post(`${API_BASE}/api/admin/login`, { password });
  return res.data; // { token }
};

// -------------------- IMAGE UPLOAD --------------------

// Upload multiple images to Cloudinary via backend
export const uploadImages = async (files, token) => {
  if (!files?.length) return [];

  const formData = new FormData();

  // append all selected files with same key (for multer.array)
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  const res = await axios.post(`${API_BASE}/api/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  // backend responds with { urls: [ ... ] }
  return res.data.urls || [];
};
