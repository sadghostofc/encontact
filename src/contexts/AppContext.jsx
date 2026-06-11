import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react"
import { i18n } from "../constants/i18n"
import { fetchMenus, fetchItems } from "../services/api"

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Settings
  const [theme, setTheme] = useState("light")
  const [lang, setLang] = useState("pt")

  // Auth
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const login = useCallback((userData) => {
    setUser(userData)
    setLoggedIn(true)
  }, [])
  const logout = useCallback(() => {
    setUser(null)
    setLoggedIn(false)
  }, [])

  // Menus
  const [menus, setMenus] = useState([])
  const [expandedMenus, setExpandedMenus] = useState(new Set())
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [loadingMenus, setLoadingMenus] = useState(false)

  useEffect(() => {
    if (!loggedIn) return
    setLoadingMenus(true)
    fetchMenus()
      .then((data) => {
        setMenus(data)
        if (data.length > 0) setExpandedMenus(new Set([data[0].id]))
      })
      .finally(() => setLoadingMenus(false))
  }, [loggedIn])

  const toggleExpandMenu = useCallback((id) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  // Items
  const [items, setItems] = useState([])
  const [archivedIds, setArchivedIds] = useState(new Set())
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [search, setSearch] = useState("")
  const [loadingItems, setLoadingItems] = useState(false)

  useEffect(() => {
    if (!selectedMenu) return
    setLoadingItems(true)
    setSelectedIds(new Set())
    setSearch("")

    fetchItems(selectedMenu.id)
      .then((data) => {
        setItems(data)
        setArchivedIds(new Set())
      })
      .catch((err) => {
        console.error("Erro ao carregar itens:", err)
      })
      .finally(() => setLoadingItems(false))
  }, [selectedMenu])

  const visibleItems = items.filter(
    (i) =>
      !archivedIds.has(i.id) &&
      ((i.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (i.subject ?? "").toLowerCase().includes(search.toLowerCase())),
  )

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const selectAll = useCallback((ids) => setSelectedIds(new Set(ids)), [])
  const clearSelection = useCallback(() => setSelectedIds(new Set()), [])

  const toggleStar = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, starred: !i.starred } : i)),
    )
  }, [])

  const markRead = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i)),
    )
  }, [])

  const archiveSelected = useCallback(() => {
    setArchivedIds((prev) => new Set([...prev, ...selectedIds]))
    setSelectedIds(new Set())
    return selectedIds.size
  }, [selectedIds])

  // User menu dropdown
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Toast
  const [toast, setToast] = useState(null)
  const showToast = useCallback((msg) => setToast(msg), [])
  const hideToast = useCallback(() => setToast(null), [])

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(256)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      if (!isResizing.current) return
      const delta = e.clientX - startX.current
      setSidebarWidth(Math.min(480, Math.max(160, startWidth.current + delta)))
    }
    const onUp = () => {
      if (!isResizing.current) return
      isResizing.current = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }
  }, [])

  const startResize = useCallback(
    (e) => {
      e.preventDefault()
      isResizing.current = true
      startX.current = e.clientX
      startWidth.current = sidebarWidth
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    },
    [sidebarWidth],
  )

  const t = i18n[lang]
  const isDark = theme === "dark"
  const unreadCount = visibleItems.filter((i) => !i.read).length

  return (
    <AppContext.Provider
      value={{
        // settings
        theme,
        setTheme,
        lang,
        setLang,
        t,
        isDark,
        // auth
        user,
        loggedIn,
        login,
        logout,
        // menus
        menus,
        loadingMenus,
        expandedMenus,
        toggleExpandMenu,
        selectedMenu,
        setSelectedMenu,
        // items
        items,
        visibleItems,
        loadingItems,
        archivedIds,
        selectedIds,
        search,
        setSearch,
        unreadCount,
        toggleSelect,
        selectAll,
        clearSelection,
        toggleStar,
        markRead,
        archiveSelected,
        // toast
        toast,
        showToast,
        hideToast,
        // sidebar
        sidebarOpen,
        setSidebarOpen,
        sidebarWidth,
        startResize,
        // user menu
        showUserMenu,
        setShowUserMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used inside AppProvider")
  return ctx
}
