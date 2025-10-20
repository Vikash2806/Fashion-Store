import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// DRESSES
export const getDresses = () =>
  axios.get(`${API_BASE}/api/dresses`).then((res) => res.data);

export const createDress = (dress, token) =>
  axios
    .post(`${API_BASE}/api/dresses`, dress, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const updateDress = (id, data, token) =>
  axios
    .put(`${API_BASE}/api/dresses/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const deleteDress = (id, token) =>
  axios
    .delete(`${API_BASE}/api/dresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

// ADMIN LOGIN
export const adminLogin = (password) =>
  axios.post(`${API_BASE}/api/admin/login`, { password }).then((res) => res.data);

// IMAGE UPLOAD
export const uploadImages = async (files, token) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await axios.post(`${API_BASE}/api/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.urls;
};
