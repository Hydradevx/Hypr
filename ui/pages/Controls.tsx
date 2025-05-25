import { useEffect, useState } from "react";

type Channel = { id: string; name: string };
type Guild = { id: string; name: string; channels: Channel[] };

export default function Controls() {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/servers")
      .then((res) => res.json())
      .then(setGuilds)
      .catch((err) => console.error("Failed to fetch servers", err));
  }, []);

  const handleGuildChange = (id: string) => {
    setSelectedGuild(id);
    setSelectedChannel(""); 
  };

  const handleSubmit = async () => {
    if (!selectedGuild || !selectedChannel || !command.trim()) {
      setStatus("Please select server, channel and enter a command.");
      return;
    }

    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guildId: selectedGuild,
        channelId: selectedChannel,
        command,
      }),
    });

    const data = await res.json();
    setStatus(data.message || (data.success ? "Command sent!" : "Failed to send command."));
  };

  const selectedGuildObj = guilds.find((g) => g.id === selectedGuild);

  return (
    <div className="p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full">
      <h1 className="text-4xl font-bold mb-8 text-blue-400 drop-shadow-lg">
        Send Commands
      </h1>

      <div className="grid gap-6 max-w-2xl">
        <div>
          <label className="block mb-2 text-blue-300">Server</label>
          <select
            value={selectedGuild}
            onChange={(e) => handleGuildChange(e.target.value)}
            className="w-full bg-blue-900/40 border border-blue-700 text-white p-3 rounded-xl shadow-md hover:shadow-blue-500/40 transition-all duration-200"
          >
            <option value="">Select a server</option>
            {guilds.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-blue-300">Channel</label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            disabled={!selectedGuild}
            className="w-full bg-blue-900/40 border border-blue-700 text-white p-3 rounded-xl shadow-md hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50"
          >
            <option value="">Select a channel</option>
            {selectedGuildObj?.channels.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-blue-300">Command</label>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="!ping or any selfbot command"
            className="w-full bg-blue-900/40 border border-blue-700 text-white p-3 rounded-xl shadow-md hover:shadow-blue-500/40 transition-all duration-200"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-blue-500/40 transition-all duration-200"
        >
          Send Command
        </button>

        {status && (
          <p className="text-sm text-blue-300 mt-4 drop-shadow">{status}</p>
        )}
      </div>
    </div>
  );
}
