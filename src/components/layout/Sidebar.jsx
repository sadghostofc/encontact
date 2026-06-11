import { useApp } from "../../contexts/AppContext";
import Spinner from "../ui/Spinner";

export default function Sidebar() {
  const {
    t, isDark,
    menus, loadingMenus, expandedMenus, toggleExpandMenu,
    selectedMenu, setSelectedMenu,
    unreadCount,
    sidebarOpen, sidebarWidth, startResize,
  } = useApp();

  return (
    <aside
      className={`relative shrink-0 flex flex-col border-r overflow-hidden z-20
        ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
      style={{ width: sidebarOpen ? sidebarWidth : 0, transition: sidebarOpen ? "none" : "width 0.3s" }}
    >
      <div className="flex-1 overflow-y-auto py-3">
        {loadingMenus ? (
          <div className={`px-4 py-6 text-sm text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            <Spinner className={`w-5 h-5 mx-auto mb-2 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
            {t.loading}
          </div>
        ) : (
          <nav aria-label="Menu de navegação">
            {menus.map((menu) => (
              <MenuGroup
                key={menu.id}
                menu={menu}
                expanded={expandedMenus.has(menu.id)}
                onToggle={() => toggleExpandMenu(menu.id)}
                selectedMenu={selectedMenu}
                onSelect={setSelectedMenu}
                unreadCount={unreadCount}
                isDark={isDark}
              />
            ))}
          </nav>
        )}
      </div>

      {/* Resize handle */}
      <div onMouseDown={startResize} title="Arrastar para redimensionar"
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize group z-30 flex items-center justify-center">
        <div className={`w-1 h-full transition-colors group-hover:bg-violet-500/60 group-active:bg-violet-500 ${isDark ? "bg-gray-700/40" : "bg-gray-200/60"}`} />
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {[0,1,2].map((i) => <div key={i} className={`w-1 h-1 rounded-full ${isDark ? "bg-gray-400" : "bg-gray-500"}`} />)}
        </div>
      </div>
    </aside>
  );
}

function MenuGroup({ menu, expanded, onToggle, selectedMenu, onSelect, unreadCount, isDark }) {
  return (
    <div>
      <button onClick={onToggle} aria-expanded={expanded}
        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${isDark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
        <span>{menu.name}</span>
        <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {expanded && (
        <ul>
          {menu.subMenus.map((sub) => (
            <SubMenuItem
              key={sub.id}
              sub={sub}
              isActive={selectedMenu?.id === sub.id}
              onSelect={onSelect}
              unreadCount={unreadCount}
              isDark={isDark}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function SubMenuItem({ sub, isActive, onSelect, unreadCount, isDark }) {
  return (
    <li>
      <button onClick={() => onSelect(sub)} aria-current={isActive ? "page" : undefined}
        className={`w-full flex items-center gap-2.5 px-5 py-2 text-sm transition-all ${
          isActive
            ? "bg-violet-500/10 text-violet-600 font-semibold border-r-2 border-violet-500"
            : isDark ? "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}>
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <span className="truncate">{sub.name}</span>
        {isActive && unreadCount > 0 && (
          <span className="ml-auto bg-violet-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
        )}
      </button>
    </li>
  );
}


