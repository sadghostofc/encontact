import { useApp } from "../../contexts/AppContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "../inbox/Toolbar";
import ItemList from "../inbox/ItemList";
import Toast from "../ui/Toast";

export default function AppShell() {
  const { isDark, selectedMenu } = useApp();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {selectedMenu && <Toolbar />}
          <div className={`flex-1 overflow-y-auto ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
            <ItemList />
          </div>
        </main>
      </div>
      <Toast />
      <style>{`
        @keyframes slide-in { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}


