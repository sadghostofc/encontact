import { useRef } from "react";
import { useApp } from "../../contexts/AppContext";

export default function Navbar() {
  const { t, isDark, setTheme, lang, setLang, logout, user,
          sidebarOpen, setSidebarOpen, search, setSearch,
          showUserMenu, setShowUserMenu } = useApp();

  const userMenuRef = useRef(null);

  return (
    <header className={`flex items-center justify-between px-4 h-14 border-b shrink-0 z-30 sticky top-0 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar"
          className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-linaer-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>enContact</span>
        </div>
      </div>

      <div className={`flex items-center gap-2 flex-1 max-w-sm mx-6 px-3 py-1.5 rounded-xl border text-sm ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
        <svg className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search}
          aria-label={t.search}
          className={`bg-transparent outline-none text-sm w-full ${isDark ? "text-gray-200 placeholder-gray-600" : "text-gray-700 placeholder-gray-400"}`} />
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={t.theme}
          className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
          {isDark
            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          }
        </button>

        <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label={t.language}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
          {lang === "pt" ? "EN" : "PT"}
        </button>

        <UserMenu />
      </div>
    </header>
  );
}

function UserMenu() {
  const { t, isDark, logout, user, showUserMenu, setShowUserMenu } = useApp();
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setShowUserMenu(!showUserMenu)} aria-label="Menu do usuário"
        aria-expanded={showUserMenu}
        className="w-8 h-8 rounded-full bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-violet-500">
        {user?.initials ?? "AD"}
      </button>
      {showUserMenu && (
        <div className={`absolute right-0 top-10 w-48 rounded-xl shadow-xl border overflow-hidden z-50 ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className={`px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
            <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{user?.name ?? "Admin"}</p>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{user?.email ?? "admin@enki.com"}</p>
          </div>
          <button className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>{t.profile}</button>
          <button className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>{t.settings}</button>
          <div className={`border-t ${isDark ? "border-gray-800" : "border-gray-100"}`} />
          <button onClick={() => { setShowUserMenu(false); logout(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}


