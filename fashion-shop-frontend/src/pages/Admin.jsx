import React, { useState, useEffect } from "react";
import {
  getDresses,
  adminLogin,
  createDress,
  updateDress,
  deleteDress,
  uploadImages,
} from "../api";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [dresses, setDresses] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", images: "" });
  const [editingId, setEditingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fetchDresses = async () => {
    const list = await getDresses();
    setDresses(list);
  };

  useEffect(() => {
    if (loggedIn) fetchDresses();
  }, [loggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(password);
      localStorage.setItem("admin_token", res.token);
      setToken(res.token);
      setLoggedIn(true);
      setPassword("");
    } catch {
      alert("Invalid password");
    }
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedUrls = [];
      if (files.length) uploadedUrls = await uploadImages(files, token);

      const dressData = {
        name: form.name,
        price: Number(form.price),
        images: uploadedUrls.length
          ? uploadedUrls
          : form.images.split(",").map((s) => s.trim()),
      };

      if (editingId) {
        await updateDress(editingId, dressData, token);
        setEditingId(null);
      } else {
        await createDress(dressData, token);
      }

      setForm({ name: "", price: "", images: "" });
      setFiles([]);
      setPreviews([]);
      fetchDresses();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  const handleEdit = (dress) => {
    setEditingId(dress._id);
    setForm({
      name: dress.name,
      price: dress.price,
      images: dress.images.join(", "),
    });
    setPreviews(dress.images);
    setFiles([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDress(id, token);
      fetchDresses();
    } catch {
      alert("Delete failed");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg p-8 rounded-2xl w-[90%] max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold px-4 py-2 rounded-lg shadow">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            👗 Admin Dashboard
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              setToken("");
              setLoggedIn(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition-all"
          >
            Logout
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl p-6 rounded-2xl mb-8 transition-all">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editingId ? "✏️ Edit Dress" : "➕ Add New Dress"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Dress Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Upload images or paste URLs:
              </label>
              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="block mt-2"
              />
              <input
                type="text"
                placeholder="Image URLs (comma separated)"
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
                className="w-full mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previews.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition-all">
                {editingId ? "Update Dress" : "Add Dress"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: "", price: "", images: "" });
                    setFiles([]);
                    setPreviews([]);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Dresses Table */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden transition-all">
          <table className="w-full text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-indigo-600/80 text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Images</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dresses.map((dress, index) => (
                <tr
                  key={dress._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{dress.name}</td>
                  <td className="p-3">₹{dress.price}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {dress.images.slice(0, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(dress)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dress._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
