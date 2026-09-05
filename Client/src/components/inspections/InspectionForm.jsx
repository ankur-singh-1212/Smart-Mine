import { useState } from "react";
import { mines, inspectors, inspectionCategories } from "../../data/demoData";
import PhotoUpload from "./PhotoUpload";

export default function InspectionForm({ onSubmit, onChange }) {
  const [form, setForm] = useState({
    mine: "",
    area: "",
    inspectionDate: new Date().toISOString().slice(0, 10),
    category: "Safety",
    inspector: inspectors[0],
    description: "",
  });
  const [photos, setPhotos] = useState([]);

  const update = (next) => {
    setForm(next);
    onChange && onChange(next);
  };

  const set = (key) => (e) => update({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, photos });
  };

  const inputClass =
    "w-full h-10 rounded-lg px-3 border border-[#c3c6d7] outline-none focus:border-[#2563eb]";
  const labelClass = "block text-xs font-semibold uppercase mb-1 text-[#434655]";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h4 className="text-xl font-semibold pb-2 border-b border-[#c3c6d7] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6]">list_alt</span>
          1. Inspection Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Target Mine</label>
            <select required value={form.mine} onChange={set("mine")} className={inputClass}>
              <option value="">Select a mine...</option>
              {mines.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Specific Area / Zone</label>
            <input
              required
              type="text"
              value={form.area}
              onChange={set("area")}
              placeholder="e.g., Section B, Pit 4"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Inspection Date</label>
            <input required type="date" value={form.inspectionDate} onChange={set("inspectionDate")} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={set("category")} className={inputClass}>
              {inspectionCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Inspector</label>
            <select value={form.inspector} onChange={set("inspector")} className={inputClass}>
              {inspectors.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Initial Observations</label>
            <textarea
              required
              rows="3"
              value={form.description}
              onChange={set("description")}
              placeholder="Briefly describe the context or initial findings..."
              className="w-full rounded-lg p-3 border border-[#c3c6d7] outline-none resize-none focus:border-[#2563eb]"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-xl font-semibold pb-2 border-b border-[#c3c6d7] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6]">photo_camera</span>
          2. Evidence Upload
        </h4>
        <PhotoUpload
          photos={photos}
          onAdd={(src) => setPhotos((p) => [...p, src])}
          onRemove={(index) => setPhotos((p) => p.filter((_, i) => i !== index))}
        />
      </section>
    </form>
  );
}