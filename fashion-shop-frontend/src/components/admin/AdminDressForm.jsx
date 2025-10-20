import React, { useState, useEffect } from "react";

/*
Props:
- initial (optional) : { name, price, images: [url] }
- onSubmit(payload) : called with { name, price, images }
- onCancel() optional
*/
export default function AdminDressForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [imagesText, setImagesText] = useState((initial?.images || []).join("\n"));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setPrice(initial.price || "");
      setImagesText((initial.images || []).join("\n"));
    }
  }, [initial]);

  const submit = async (e) => {
    e && e.preventDefault();
    setSaving(true);
    const images = imagesText
      .split(/\n|,/)
      .map(s => s.trim())
      .filter(Boolean);
    try {
      await onSubmit({ name, price: Number(price), images });
      setName(""); setPrice(""); setImagesText("");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded">
      <div>
        <label className="text-sm block mb-1">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-2 py-1 bg-gray-50 dark:bg-gray-900" />
      </div>

      <div>
        <label className="text-sm block mb-1">Price</label>
        <input value={price} onChange={e => setPrice(e.target.value)} required type="number" className="w-full border rounded px-2 py-1 bg-gray-50 dark:bg-gray-900" />
      </div>

      <div>
        <label className="text-sm block mb-1">Image URLs (one per line or comma separated)</label>
        <textarea value={imagesText} onChange={e => setImagesText(e.target.value)} rows="4" className="w-full border rounded px-2 py-1 bg-gray-50 dark:bg-gray-900" />
        {imagesText.trim() && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {imagesText.split(/\n|,/).map((s,i)=>s.trim()).filter(Boolean).map((url,i)=>(
              <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded" onError={(e)=> e.currentTarget.style.opacity=0.4}/>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>}
        <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
