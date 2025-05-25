import { useEffect, useState } from "react";

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
    <div className="p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 drop-shadow-lg">
        Command Executor
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Server:</label>
          <select
            value={selectedServerId}
            onChange={handleServerChange}
            className="w-full bg-blue-900 text-white p-2 rounded"
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
            <label className="block mb-1">Channel:</label>
            <select
              value={selectedChannelId}
              onChange={(e) => setSelectedChannelId(e.target.value)}
              className="w-full bg-blue-900 text-white p-2 rounded"
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
          <label className="block mb-1">Command:</label>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command with arguments"
            className="w-full bg-blue-900 text-white p-2 rounded"
          />
        </div>

        <button
          onClick={handleSendCommand}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Send Command
        </button>

        {response && (
          <div className="mt-4 text-green-400 bg-blue-950 p-3 rounded shadow">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
