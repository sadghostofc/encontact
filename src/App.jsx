import { AppProvider, useApp } from "./contexts/AppContext"
import LoginPage from "./components/auth/LoginPage"
import AppShell from "./components/layout/AppShell"

function Router() {
  const { loggedIn } = useApp()
  return loggedIn ? <AppShell /> : <LoginPage />
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}


