import { useState } from "react";
import { showError, showSuccess } from "../utils/toast";

type ConfigType = {
  token: string;
  prefix: string;
  safetyTime: number;
  rpc: boolean;
  autoreact: boolean;
  hasAccess: string[];
};

export default function CreateConfig({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [config, setConfig] = useState<ConfigType>({
    token: "",
    prefix: ".",
    safetyTime: 5,
    rpc: true,
    autoreact: false,
    hasAccess: [],
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (
    key: keyof ConfigType,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createConfig = async () => {
    if (!config.token.trim()) {
      showError("Token is required");
      return;
    }

    try {
      setSaving(true);

      await window.electron.ipcRenderer.invoke(
        "config:create",
        config
      );

      showSuccess("Config created");

      onCreated();
    } catch (err) {
      console.error(err);
      showError("Failed to create config");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-blue-900 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400">
            Welcome to Hypr
          </h1>

          <p className="text-gray-400 mt-2">
            Create your configuration to get started.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-blue-300">
              Discord Token
            </label>

            <input
              type="password"
              value={config.token}
              onChange={(e) =>
                handleChange("token", e.target.value)
              }
              className="w-full bg-[#020617] border border-blue-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Paste your token"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-blue-300">
                Prefix
              </label>

              <input
                value={config.prefix}
                onChange={(e) =>
                  handleChange("prefix", e.target.value)
                }
                className="w-full bg-[#020617] border border-blue-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-blue-300">
                Safety Time (seconds)
              </label>

              <input
                type="number"
                value={config.safetyTime}
                onChange={(e) =>
                  handleChange(
                    "safetyTime",
                    Number(e.target.value)
                  )
                }
                className="w-full bg-[#020617] border border-blue-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {[
              ["rpc", "Enable Rich Presence"],
              ["autoreact", "Enable Auto React"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={config[key as keyof ConfigType] as boolean}
                  onChange={(e) =>
                    handleChange(
                      key as keyof ConfigType,
                      e.target.checked
                    )
                  }
                />

                <span>{label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={createConfig}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white shadow-lg"
          >
            {saving
              ? "Creating Config..."
              : "Create Config"}
          </button>
        </div>
      </div>
    </div>
  );
}