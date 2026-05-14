import { useEffect, useState } from "react";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";
import Layout from "../components/Layout";
import { showSuccess, showError } from "../utils/toast";

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
    async function loadServers() {
      try {
        const data = await window.hypr.getServers();
        setServers(data || []);
      } catch (err) {
        console.error(err);
        showError("Failed to load servers");
      }
    }

    loadServers();
  }, []);

  const handleServerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedServerId(e.target.value);
    setSelectedChannelId("");
  };

  const handleSendCommand = async () => {
    if (!selectedChannelId || !command.trim()) return;

    try {
      await window.hypr.sendCommand(
        selectedChannelId,
        command.trim()
      );

      
      setResponse("Command sent successfully.");
      showSuccess("Command sent");

      setCommand("");
    } catch (err) {
      console.error(err);
      showError("Failed to send command");
    }
  };

  const selectedServer = servers.find(
    (s) => s.id === selectedServerId,
  );

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
            <label className="block mb-1 opacity-80">
              Server:
            </label>

            <select
              value={selectedServerId}
              onChange={handleServerChange}
              className={`w-full p-3 rounded-xl backdrop-blur-sm border outline-none transition-all
                ${activeTheme.input}
                ${activeTheme.inputBorder}`}
            >
              <option value="">Select a server</option>

              {servers.map((server) => (
                <option
                  key={server.id}
                  value={server.id}
                >
                  {server.name}
                </option>
              ))}
            </select>
          </div>

          {selectedServer && (
            <div>
              <label className="block mb-1 opacity-80">
                Channel:
              </label>

              <select
                value={selectedChannelId}
                onChange={(e) =>
                  setSelectedChannelId(e.target.value)
                }
                className={`w-full p-3 rounded-xl backdrop-blur-sm border outline-none transition-all
                  ${activeTheme.input}
                  ${activeTheme.inputBorder}`}
              >
                <option value="">Select a channel</option>

                {selectedServer.channels.map((channel) => (
                  <option
                    key={channel.id}
                    value={channel.id}
                  >
                    #{channel.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 opacity-80">
              Command:
            </label>

            <input
              type="text"
              value={command}
              onChange={(e) =>
                setCommand(e.target.value)
              }
              placeholder="Enter command with arguments"
              className={`w-full p-3 rounded-xl backdrop-blur-sm border outline-none transition-all
                ${activeTheme.input}
                ${activeTheme.inputBorder}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendCommand();
                }
              }}
            />
          </div>

          <button
            onClick={handleSendCommand}
            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200
              ${activeTheme.button}
              ${activeTheme.buttonHover}`}
          >
            Send Command
          </button>

          {response && (
            <div
              className={`mt-4 p-4 rounded-xl border shadow-md
                ${activeTheme.input}
                ${activeTheme.inputBorder}`}
            >
              {response}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}