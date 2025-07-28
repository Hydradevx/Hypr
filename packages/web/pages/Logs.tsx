import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]);
  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];

  useEffect(() => {
    const fetchLogs = () => {
      fetch("/api/logs")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.logs)) setLogs(data.logs);
        })
        .catch(console.error);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div
        className={`min-h-screen w-full transition-all duration-300 ${activeTheme.background} ${activeTheme.text} overflow-x-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Logs
          </h1>

          <div
            className={`rounded-xl p-4 border shadow-inner overflow-auto h-[75vh] max-h-[75vh] font-mono text-sm whitespace-pre-wrap
              ${activeTheme.input} ${activeTheme.inputBorder}`}
          >
            <pre className="text-blue-100">
              {logs.length ? logs.join("\n") : "No logs yet..."}
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  );
}
