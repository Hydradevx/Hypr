import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]);

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
    <div className="p-6 text-white font-mono bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full">
      <h1 className="text-4xl font-bold mb-6 text-blue-400 drop-shadow-lg">
        Logs
      </h1>
      <div className="bg-black/40 border border-blue-500/20 rounded-xl p-4 shadow-inner overflow-auto h-[75vh] max-h-[75vh]">
        <pre className="whitespace-pre-wrap text-sm text-blue-100">
          {logs.length ? logs.join("\n") : "No logs yet..."}
        </pre>
      </div>
    </div>
  );
}
