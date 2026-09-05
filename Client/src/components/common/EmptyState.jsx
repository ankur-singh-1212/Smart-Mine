export default function EmptyState({ icon = "search_off", title = "Nothing found", description }) {
  return (
    <div className="py-12 text-center text-[#737686]">
      <span className="material-symbols-outlined block text-4xl mb-2">{icon}</span>
      <p className="font-medium text-[#191c1e]">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  );
}