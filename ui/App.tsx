import { useEffect, useState } from "react";

type BotStats = {
  username: string;
  servers: number;
  ping: number;
  uptime: string;
};

function App() {
  const [stats, setStats] = useState<BotStats | null>(null);

  useEffect(() => {
    fetch("/api/botStats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Hydrion Selfbot Dashboard
        </h1>
        {stats ? (
          <ul className="space-y-2 text-gray-800">
            <li>
              <span className="font-semibold">Username:</span> {stats.username}
            </li>
            <li>
              <span className="font-semibold">Servers:</span> {stats.servers}
            </li>
            <li>
              <span className="font-semibold">Ping:</span> {stats.ping}ms
            </li>
            <li>
              <span className="font-semibold">Uptime:</span> {stats.uptime}
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
