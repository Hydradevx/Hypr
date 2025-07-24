import { useEffect, useState } from "react";
import { Gauge, Server, Clock, Activity } from "lucide-react";
import { showSuccess } from "../utils/toast";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";

type BotStats = {
  username: string;
  servers: number;
  ping: number;
  uptime: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<BotStats | null>(null);
  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/botStats")
        .then((res) => res.json())
        .then(setStats)
        .catch(console.error);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 ${activeTheme.background} ${activeTheme.text} overflow-x-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10 drop-shadow-lg">Bot Dashboard</h1>

        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Username"
              value={stats.username}
              icon={<Activity size={32} />}
              glow={activeTheme.glow}
            />
            <StatCard
              title="Servers"
              value={stats.servers}
              icon={<Server size={32} />}
              glow={activeTheme.glow}
            />
            <StatCard
              title="Ping"
              value={`${stats.ping}ms`}
              icon={<Gauge size={32} />}
              glow={activeTheme.glow}
            />
            <StatCard
              title="Uptime"
              value={stats.uptime}
              icon={<Clock size={32} />}
              glow={activeTheme.glow}
            />
          </div>
        ) : (
          <p className="text-gray-400">Loading stats...</p>
        )}

        <div className="mt-10">
          <button
            onClick={() => {
              fetch("/api/kill", { method: "POST" })
                .then((res) => res.json())
                .then((data) => showSuccess(data.message));
            }}
            className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold
              bg-red-600 text-white shadow-[0_0_15px_#f87171] hover:bg-red-700`}
          >
            Kill Selfbot
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  glow,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  glow: string;
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/10 flex flex-col items-start gap-2 hover:scale-[1.02] transition-all duration-300 bg-white/10 dark:bg-black/20 ${glow}`}
    >
      <div className="opacity-80">{icon}</div>
      <h2 className="text-sm uppercase tracking-wide opacity-60">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
