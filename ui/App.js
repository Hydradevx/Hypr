import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Controls from "./pages/Controls";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import RpcEditor from "./pages/RpcEditor";
import { Toaster } from "sonner";
export default function App() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 3000);
        return () => clearTimeout(timeout);
    }, []);
    if (!loaded)
        return _jsx(LoadingScreen, {});
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-right", toastOptions: {
                    className: "bg-[#0f172a] text-blue-300 border border-blue-800 shadow-lg rounded-xl px-4 py-3 font-sans",
                    style: {
                        backgroundColor: "#0f172a",
                        color: "#93c5fd",
                        borderColor: "#1e3a8a",
                    },
                    duration: 4000,
                } }), _jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/logs", element: _jsx(Logs, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/controls", element: _jsx(Controls, {}) }), _jsx(Route, { path: "/rpc", element: _jsx(RpcEditor, {}) })] }) })] })] }));
}
