import { useState } from "react";
import { useApp } from "../../contexts/AppContext";
import Avatar from "../ui/Avatar";

export default function ItemCard({ item }) {
  const { isDark, selectedIds, toggleSelect, toggleStar, markRead } = useApp();
  const [hovered, setHovered] = useState(false);

  const selected     = selectedIds.has(item.id);
  const anySelected  = selectedIds.size > 0;
  const showCheckbox = hovered || anySelected;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="listitem"
      aria-selected={selected}
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-all duration-150 border-b ${
        isDark
          ? `border-gray-800 hover:bg-gray-800/60 ${selected ? "bg-gray-800/80" : ""} ${!item.read ? "border-l-2 border-l-violet-500" : ""}`
          : `border-gray-100 hover:bg-violet-50/50 ${selected ? "bg-violet-50" : ""} ${!item.read ? "border-l-2 border-l-violet-500" : ""}`
      }`}
    >
      <div className="shrink-0 pt-0.5">
        <Avatar
          initials={item.owner}
          size="lg"
          checked={selected}
          showCheckbox={showCheckbox}
          onClick={() => toggleSelect(item.id)}
        />
      </div>

      <div className="flex-1 min-w-0" onClick={() => markRead(item.id)}>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-sm truncate ${!item.read ? "font-bold" : "font-medium"} ${isDark ? "text-gray-100" : "text-gray-900"}`}
          >
            {item.name}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleStar(item.id)
              }}
              aria-label={
                item.starred ? "Remover favorito" : "Adicionar favorito"
              }
              className={`transition-colors ${item.starred ? "text-amber-400" : isDark ? "text-gray-700 hover:text-amber-400" : "text-gray-300 hover:text-amber-400"}`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill={item.starred ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
            <span
              className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {item.date}
            </span>
          </div>
        </div>
        <p
          className={`text-xs mt-0.5 truncate ${!item.read ? "font-medium" : ""} ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          {item.subject}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          {(item.users ?? []).map((u, i) => (
            <Avatar
              key={i}
              initials={u}
              size="sm"
              checked={selected}
              showCheckbox={showCheckbox}
              onClick={() => toggleSelect(item.id)}
            />
          ))}
          {!item.read && (
            <span
              className="ml-auto w-2 h-2 rounded-full bg-violet-500 shrink-0"
              aria-label="Não lido"
            />
          )}
        </div>
      </div>
    </div>
  )
}


