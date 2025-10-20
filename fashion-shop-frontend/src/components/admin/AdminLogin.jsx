import React, { useState } from "react";
import { adminLogin } from "../../api";
import useAuth from "../../hooks/useAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await adminLogin(password);
      if (res?.token) {
        login(res.token);
      } else {
        setErr("No token received");
      }
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="text-xl font-semibold mb-4">Admin login</h3>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-900"
            required
          />
        </div>

        {err && <div className="text-red-500 text-sm">{err}</div>}

        <div className="flex justify-end">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
