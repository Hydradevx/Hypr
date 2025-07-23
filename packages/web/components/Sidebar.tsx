import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { sidebarNav } from "../lib/ui.config";
import clsx from "clsx";
import ElectricParticles from "./ElectricPartciles";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 h-full transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <ElectricParticles />
      <div className="relative h-full w-full bg-gradient-to-br from-[#0f172a]/60 via-[#1e293b]/60 to-[#0f172a]/60 border-r border-blue-500/40 shadow-[0_0_30px_#3b82f6aa] backdrop-blur-2xl">
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2">
            <img
              src="/hypr.jpg"
              alt="Hypr"
              className={clsx(
                "w-12 h-12 rounded-full object-cover shadow-[0_0_12px_#3b82f6]",
                !expanded && "opacity-0 scale-0"
              )}
            />
            <span
              className={clsx(
                "text-blue-300 text-xl font-bold tracking-wide",
                !expanded && "opacity-0 scale-0"
              )}
            >
              Hypr
            </span>
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-blue-300 md:hidden"
          >
            {expanded ? (
              <Icons.ChevronLeft className="w-6 h-6" />
            ) : (
              <Icons.ChevronRight className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-1 px-2">
          {sidebarNav.map(({ path, name, icon }) => {
            const Icon = Icons[icon as keyof typeof Icons];
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={clsx(
                  "group flex items-center gap-4 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-blue-600/30 text-blue-300 shadow-[0_0_10px_#3b82f6aa]"
                    : "hover:bg-blue-500/20 text-white/80 hover:text-blue-300"
                )}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={clsx(
                    "transition-all",
                    !expanded && "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-pulse blur-lg" />
      </div>
    </aside>
  );
}
