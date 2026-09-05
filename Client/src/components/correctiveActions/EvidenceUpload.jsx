import PhotoUpload from "../inspections/PhotoUpload";

export default function EvidenceUpload({ photos = [], onAdd, onRemove, title = "Upload Resolution Evidence" }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-[#434655] mb-3">
        {title}
      </h4>
      <PhotoUpload photos={photos} onAdd={onAdd} onRemove={onRemove} />
    </div>
  );
}