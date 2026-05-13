import { useEffect, useState } from "react";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";
import Layout from "../components/Layout";

type Channel = {
  id: string;
  name: string;
};

type Server = {
  id: string;
  name: string;
  channels: Channel[];
};

export default function Controls() {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServerId, setSelectedServerId] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];

  useEffect(() => {
    fetch("/api/servers")
      .then((res) => res.json())
      .then(setServers)
      .catch(console.error);
  }, []);

  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServerId(e.target.value);
    setSelectedChannelId("");
  };

  const handleSendCommand = async () => {
    if (!selectedChannelId || !command.trim()) return;

    const res = await fetch("/api/sendCommand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channelId: selectedChannelId,
        content: command.trim(),
      }),
    });

    const data = await res.json();
    setResponse(data.message || "Command sent.");
  };

  const selectedServer = servers.find((s) => s.id === selectedServerId);

  return (
    <Layout>
    <div
      className={`p-6 min-h-screen w-full transition-all duration-300 font-sans ${activeTheme.background} ${activeTheme.text}`}
    >
      <h1 className="text-3xl font-bold mb-6 drop-shadow-lg text-primary">
        Command Executor
      </h1>

      <div className="space-y-5 max-w-xl">
        <div>
          <label className="block mb-1 opacity-80">Server:</label>
          <select
            value={selectedServerId}
            onChange={handleServerChange}
            className="w-full p-2 rounded bg-white/10 border border-white/10 backdrop-blur-sm"
          >
            <option value="">Select a server</option>
            {servers.map((server) => (
              <option key={server.id} value={server.id}>
                {server.name}
              </option>
            ))}
          </select>
        </div>

        {selectedServer && (
          <div>
            <label className="block mb-1 opacity-80">Channel:</label>
            <select
              value={selectedChannelId}
              onChange={(e) => setSelectedChannelId(e.target.value)}
              className="w-full p-2 rounded bg-white/10 border border-white/10 backdrop-blur-sm"
            >
              <option value="">Select a channel</option>
              {selectedServer.channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  #{channel.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1 opacity-80">Command:</label>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command with arguments"
            className="w-full p-2 rounded bg-white/10 border border-white/10 backdrop-blur-sm"
          />
        </div>

        <button
          onClick={handleSendCommand}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200"
        >
          Send Command
        </button>

        {response && (
          <div className="mt-4 text-green-400 bg-black/40 p-3 rounded shadow">
            {response}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}
