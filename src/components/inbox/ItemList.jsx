import { useApp } from "../../contexts/AppContext";
import ItemCard from "./ItemCard";
import Spinner from "../ui/Spinner";

export default function ItemList() {
  const { t, isDark, selectedMenu, visibleItems, loadingItems } = useApp();

  if (!selectedMenu) return <EmptyState t={t} isDark={isDark} />;
  if (loadingItems)  return <LoadingState t={t} isDark={isDark} />;
  if (visibleItems.length === 0) return <NoItemsState t={t} isDark={isDark} />;

  return (
    <div role="list" aria-label={selectedMenu.name}>
      {visibleItems.map((item) => <ItemCard key={item.id} item={item} />)}
    </div>
  );
}

function EmptyState({ t, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
        <svg className={`w-8 h-8 ${isDark ? "text-gray-600" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <div>
        <p className={`text-base font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.selectMenu}</p>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t.selectMenuDesc}</p>
      </div>
    </div>
  );
}

function LoadingState({ t, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Spinner className={`w-8 h-8 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
      <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t.loading}</p>
    </div>
  );
}

function NoItemsState({ t, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <svg className={`w-12 h-12 ${isDark ? "text-gray-700" : "text-gray-200"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t.noItems}</p>
    </div>
  );
}


