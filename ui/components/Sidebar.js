import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, Settings, Terminal, Bot, ChevronLeft, ChevronRight, LayoutDashboard, } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
const navItems = [
    { path: "/", name: "Dashboard", icon: Home },
    { path: "/controls", name: "Bot Controls", icon: Bot },
    { path: "/settings", name: "Settings", icon: Settings },
    { path: "/logs", name: "Logs", icon: Terminal },
    { path: "/rpc", name: "RPC Editor", icon: LayoutDashboard },
];
export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    return (_jsxs("aside", { className: clsx("h-screen bg-gradient-to-b from-black via-[#0f172a] to-black border-r border-blue-900 transition-all duration-300 font-sans", expanded ? "w-64" : "w-20"), children: [_jsxs("div", { className: "flex items-center justify-between p-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: "/hydrion.jpg", alt: "Hydrion Logo", className: clsx("w-20 h-20 mr-2 transition-opacity duration-200", !expanded && "opacity-0") }), _jsx("h1", { className: clsx("text-blue-400 text-xl font-semibold transition-opacity duration-200", !expanded && "opacity-0"), children: "Hydrion" })] }), _jsx("button", { onClick: () => setExpanded((p) => !p), className: "text-blue-400 hover:text-blue-300 transition-all", children: !expanded ? (_jsx(ChevronLeft, { className: "w-6 h-6 drop-shadow-[0_0_6px_#3b82f6]", style: { marginLeft: "-4.5rem" } })) : (_jsx(ChevronRight, { className: "w-6 h-6 drop-shadow-[0_0_6px_#3b82f6]" })) })] }), _jsx("nav", { className: "flex flex-col gap-2 mt-4 px-2", children: navItems.map(({ path, name, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (_jsxs(Link, { to: path, className: clsx("group flex items-center gap-4 py-2 px-3 rounded-xl transition-all duration-200", isActive
                            ? "bg-blue-800/40 text-blue-300"
                            : "hover:bg-blue-700/20 text-gray-300 hover:text-blue-300"), children: [_jsx(Icon, { className: clsx("w-6 h-6 flex-shrink-0 transition-all duration-200", isActive
                                    ? "drop-shadow-[0_0_6px_#3b82f6] text-blue-400"
                                    : "group-hover:drop-shadow-[0_0_6px_#3b82f6] group-hover:text-blue-300") }), _jsx("span", { className: clsx("transition-opacity duration-200 whitespace-nowrap overflow-hidden", !expanded && "opacity-0 w-0"), children: name })] }, path));
                }) })] }));
}
