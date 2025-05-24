import { useEffect, useState } from "react";

type BotStats = {
  username: string;
  servers: number;
  ping: number;
  uptime: string;
};

function Dashboard() {
  const [stats, setStats] = useState<BotStats | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/botStats")
        .then((res) => res.json())
        .then(setStats)
        .catch(console.error);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full">
      <h1 className="text-4xl font-bold mb-10 text-blue-400 drop-shadow-lg">
        Bot Dashboard
      </h1>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Username" value={stats.username} />
          <StatCard title="Servers" value={stats.servers} />
          <StatCard title="Ping" value={`${stats.ping}ms`} />
          <StatCard title="Uptime" value={stats.uptime} />
        </div>
      ) : (
        <p className="text-gray-400">Loading stats...</p>
      )}

      <div className="mt-10">
        <button
          onClick={() => {
            fetch("/api/kill", { method: "POST" })
              .then((res) => res.json())
              .then((data) => alert(data.message));
          }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-red-500/40 transition-all duration-200"
        >
          Kill Selfbot
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-blue-900/40 border border-blue-500/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
      <h2 className="text-sm text-blue-300 uppercase tracking-wide">{title}</h2>
      <p className="text-2xl font-bold text-blue-100 mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;
