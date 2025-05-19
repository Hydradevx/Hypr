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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hydrion Selfbot Dashboard</h1>
      {stats ? (
        <ul>
          <li>
            <b>Username:</b> {stats.username}
          </li>
          <li>
            <b>Servers:</b> {stats.servers}
          </li>
          <li>
            <b>Ping:</b> {stats.ping}ms
          </li>
          <li>
            <b>Uptime:</b> {stats.uptime}
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
