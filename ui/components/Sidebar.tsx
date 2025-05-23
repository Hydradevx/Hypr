import { NavLink } from "react-router-dom";
import { Home, Book, Settings, Terminal } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  { to: "/logs", label: "Logs", icon: <Book className="w-5 h-5" /> },
  {
    to: "/commands",
    label: "Commands",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold">Hydrion</div>
      <nav className="flex-1">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
