const variants = {
  primary: "bg-[#2563eb] text-white hover:bg-[#004ac6]",
  secondary: "bg-white text-[#191c1e] border border-[#c3c6d7] hover:bg-[#f2f4f6]",
  danger: "bg-[#ba1a1a] text-white hover:bg-[#a01515]",
  ghost: "text-[#004ac6] hover:bg-[#004ac6]/10",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`h-10 px-4 rounded-lg inline-flex items-center justify-center gap-2 font-semibold transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}