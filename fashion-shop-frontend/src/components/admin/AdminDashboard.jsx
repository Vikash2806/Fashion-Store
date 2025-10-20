import React, { useEffect, useState } from "react";
import { getDresses, createDress, updateDress, deleteDress } from "../../api";
import AdminDressForm from "./AdminDressForm";

export default function AdminDashboard() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // dress object or null
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("admin_token"));
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDresses();
      setDresses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async (payload) => {
    try {
      await createDress(payload, token);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Create failed");
    }
  };

  const onUpdate = async (id, payload) => {
    try {
      await updateDress(id, payload, token);
      setEditing(null);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this dress?")) return;
    try {
      await deleteDress(id, token);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 border rounded" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-2">Add new dress</h3>
          <AdminDressForm onSubmit={onCreate} />
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold mb-4">Existing dresses</h3>
          {loading ? <div>Loading…</div> :
            <div className="space-y-4">
              {dresses.map(d => (
                <div key={d._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex gap-4 items-start">
                  <div className="w-32 h-24 overflow-hidden rounded">
                    <img src={(d.images && d.images[0]) || ""} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{d.name}</div>
                        <div className="text-sm text-gray-500">#{d.number} — ₹{d.price}</div>
                      </div>
                      <div className="space-x-2">
                        <button className="px-2 py-1 border rounded text-sm" onClick={() => setEditing(d)}>Edit</button>
                        <button className="px-2 py-1 border rounded text-sm" onClick={() => onDelete(d._id)}>Delete</button>
                      </div>
                    </div>

                    {editing && editing._id === d._id && (
                      <div className="mt-3">
                        <AdminDressForm initial={editing} onSubmit={(payload) => onUpdate(d._id, payload)} onCancel={() => setEditing(null)} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
