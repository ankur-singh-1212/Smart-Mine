import { useRef, useState } from "react";

export default function PhotoUpload({ photos = [], onAdd, onRemove }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList) => {
    Array.from(fileList || []).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => onAdd && onAdd(reader.result);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      className="border-2 border-dashed border-[#c3c6d7] rounded-xl p-6 flex flex-col items-center justify-center text-center bg-[#f7f9fb] cursor-pointer"
      onClick={() => inputRef.current && inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      style={{ borderColor: dragOver ? "#2563eb" : "#c3c6d7" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div className="h-16 w-16 rounded-full bg-[#004ac6]/10 flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[32px] text-[#004ac6]">
          cloud_upload
        </span>
      </div>

      <p className="text-xl font-semibold mb-1">Drag and drop photos or documents</p>
      <p className="text-sm text-[#434655] mb-4">
        or click to browse from your device (Max 10MB per file)
      </p>

      {photos.length > 0 && (
        <div className="flex gap-4 flex-wrap justify-center">
          {photos.map((src, index) => (
            <div key={index} className="relative h-24 w-24 rounded-lg overflow-hidden border border-[#c3c6d7]">
              <img src={src} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove && onRemove(index);
                }}
                className="absolute top-1 right-1 rounded-full p-0.5 bg-[#ba1a1a] text-white"
                aria-label="Remove"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  close
                </span>
              </button>
            </div>
          ))}
          <div className="h-24 w-24 rounded-lg flex items-center justify-center border border-dashed border-[#c3c6d7] bg-[#f2f4f6]">
            <span className="material-symbols-outlined text-[#434655]">
              add_photo_alternate
            </span>
          </div>
        </div>
      )}
    </div>
  );
}