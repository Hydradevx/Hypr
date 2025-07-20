import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { showSuccess } from "../utils/toast";
function Dashboard() {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        const fetchStats = () => {
            fetch("/api/botStats")
                .then((res) => res.json())
                .then(setStats)
                .catch(console.error);
        };
        fetchStats();
        const interval = setInterval(fetchStats, 500);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full", children: [_jsx("h1", { className: "text-4xl font-bold mb-10 text-blue-400 drop-shadow-lg", children: "Bot Dashboard" }), stats ? (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(StatCard, { title: "Username", value: stats.username }), _jsx(StatCard, { title: "Servers", value: stats.servers }), _jsx(StatCard, { title: "Ping", value: `${stats.ping}ms` }), _jsx(StatCard, { title: "Uptime", value: stats.uptime })] })) : (_jsx("p", { className: "text-gray-400", children: "Loading stats..." })), _jsx("div", { className: "mt-10", children: _jsx("button", { onClick: () => {
                        fetch("/api/kill", { method: "POST" })
                            .then((res) => res.json())
                            .then((data) => showSuccess(data.message));
                    }, className: "px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-red-500/40 transition-all duration-200", children: "Kill Selfbot" }) })] }));
}
function StatCard({ title, value }) {
    return (_jsxs("div", { className: "bg-blue-900/40 border border-blue-500/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-blue-500/40 transition-all duration-300", children: [_jsx("h2", { className: "text-sm text-blue-300 uppercase tracking-wide", children: title }), _jsx("p", { className: "text-2xl font-bold text-blue-100 mt-2", children: value })] }));
}
export default Dashboard;
