export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "max-w-2xl",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay"
      style={{ background: "rgba(25,28,30,0.4)", backdropFilter: "blur(5px)" }}
    >
      <div
        className={`modal-content w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-xl bg-white shadow-xl overflow-hidden`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#c3c6d7]">
          <div>
            <h3 className="text-2xl font-semibold">{title}</h3>
            {subtitle && <p className="text-sm mt-1 text-[#434655]">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#f2f4f6]"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-6">{children}</div>

        {footer && (
          <div className="p-6 flex justify-end gap-3 border-t border-[#c3c6d7]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}