export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-[#737686]">
      <div
        className="h-10 w-10 rounded-full border-4 border-[#c3c6d7] border-t-[#2563eb] animate-spin"
        style={{ borderColor: "#c3c6d7", borderTopColor: "#2563eb" }}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}