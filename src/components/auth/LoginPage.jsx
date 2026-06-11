import { useState } from "react"
import { useApp } from "../../contexts/AppContext"
import { fakeLogin } from "../../services/api"
import Spinner from "../ui/Spinner"

export default function LoginPage() {
  const { t, isDark, setTheme, lang, setLang, login } = useApp()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError("")
    if (!username || !password) return
    setLoading(true)
    const result = await fakeLogin(username, password)
    if (result.ok) {
      login(result.user)
    } else {
      setError(t.invalidCredentials)
    }
    setLoading(false)
  }

  const inputCls = [
    "w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none",
    "focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
    isDark
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-300",
  ].join(" ")

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-linear-to-br from-violet-50 via-white to-indigo-50"}`}
    >
      <div className="fixed top-4 right-4 flex gap-2">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={t.theme}
          className={`p-2 rounded-lg text-xs font-medium transition-colors ${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          aria-label={t.language}
          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}
        >
          {lang === "pt" ? "EN" : "PT"}
        </button>
      </div>

      <div
        className={`w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}
      >
        <div className="h-1.5 bg-linear-to-r from-violet-500 via-indigo-500 to-sky-500" />
        <div className="px-10 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1
                className={`text-lg font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                enContact
              </h1>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                by Enki Group
              </p>
            </div>
          </div>

          <h2
            className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {t.loginTitle}
          </h2>
          <p
            className={`text-sm mb-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {t.loginSubtitle}
          </p>

          <div className="space-y-4">
            <div>
              <label
                className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {t.username}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Admin"
                aria-label={t.username}
                className={inputCls}
              />
            </div>
            <div>
              <label
                className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••"
                aria-label={t.password}
                className={inputCls}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !username || !password}
            className="mt-6 w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="w-4 h-4 text-white" />
                {t.loading}
              </span>
            ) : (
              t.login
            )}
          </button>

          <p
            className={`mt-4 text-center text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}
          >
            {t.loginHint}
          </p>
        </div>
      </div>
    </div>
  )
}


