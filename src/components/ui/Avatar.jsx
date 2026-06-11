const COLORS = [
  "bg-violet-500","bg-sky-500","bg-emerald-500","bg-amber-500",
  "bg-rose-500","bg-indigo-500","bg-teal-500","bg-orange-500",
];

function hashColor(str) {
  if (!str) return COLORS[0]
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return COLORS[Math.abs(h) % COLORS.length]
}

export default function Avatar({ initials, size = "md", checked = false, showCheckbox = false, onClick }) {
  const bg = hashColor(initials);
  const safe = initials ?? "?"
  const cls = size === "lg" ? "w-9 h-9 text-sm font-semibold" : "w-6 h-6 text-[10px] font-bold";

  if (showCheckbox) {
    return (
      <button
        onClick={onClick}
        aria-label={checked ? "Desmarcar" : "Selecionar"}
        className={`${cls} rounded-full flex items-center justify-center transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-violet-400
          ${checked ? "bg-violet-600 text-white" : `${bg} text-white opacity-80 hover:opacity-100`}`}
        
      >
        {checked
          ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          : <span>{initials}</span>
        }
      </button>
    );
  }

  return (
    <div className={`${cls} ${bg} rounded-full flex items-center justify-center text-white `}>
      {initials}
    </div>
  );
}


