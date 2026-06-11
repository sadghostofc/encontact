import { useApp } from "../../contexts/AppContext"

export default function Toolbar() {
  const {
    t,
    isDark,

    visibleItems,
    selectedIds,
    selectAll,
    clearSelection,
    archiveSelected,
    showToast,
    unreadCount,
  } = useApp()

  const allSelected =
    selectedIds.size > 0 && selectedIds.size === visibleItems.length

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection()
    } else {
      selectAll(visibleItems.map((i) => i.id))
    }
  }

  const handleArchive = () => {
    if (selectedIds.size === 0) {
      showToast(t.noItemsArchived)
      return
    }
    const count = archiveSelected()
    showToast(`${count} ${t.itemsArchived}`)
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 border-b shrink-0 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="selectAll"
          checked={allSelected}
          onChange={handleSelectAll}
          aria-label={t.markAll}
          className="w-4 h-4 accent-violet-600 cursor-pointer"
        />
        <label
          htmlFor="selectAll"
          className={`text-xs font-medium cursor-pointer ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {t.markAll}
        </label>
      </div>

      <div className={`h-5 w-px ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />

      <button
        onClick={handleArchive}
        aria-label={t.archiveSelected}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          selectedIds.size > 0
            ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-500/25"
            : isDark
              ? "text-gray-500 bg-gray-800 hover:bg-gray-700 cursor-default"
              : "text-gray-400 bg-gray-100 hover:bg-gray-200 cursor-default"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <span>{t.archive}</span>
        {selectedIds.size > 0 && (
          <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {selectedIds.size}
          </span>
        )}
      </button>

      <div className="ml-auto flex items-center gap-2">
        <span
          className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {visibleItems.length} {t.items}
          {unreadCount > 0 && ` · ${unreadCount} ${t.unreadLabel}`}
        </span>
      </div>
    </div>
  )
}



