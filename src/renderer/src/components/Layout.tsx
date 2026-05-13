import Sidebar from "./Sidebar"
import { useSidebarStore } from "../lib/useSidebarStore"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebarStore()

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar />
      <main
        className={`transition-all duration-300 flex-1 ${
          expanded ? "ml-[240px]" : "ml-[80px]"
        }`}
      >
        {children}
      </main>
    </div>
  )
}
