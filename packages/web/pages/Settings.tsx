import { useEffect, useState } from "react";
import { showError, showSuccess } from "../utils/toast";

type Config = {
  token: string;
  [key: string]: string | string[];
};

function Settings() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleChange = (key: string, value: string | string[]) => {
    setConfig((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = () => {
    if (!config) return;
    setSaving(true);

    fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess(data.message);
        setSaving(false);
      })
      .catch((err) => {
        console.error(err);
        showError("Failed to save config");
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="text-blue-300 p-6 font-sans bg-black h-screen w-full">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 drop-shadow-lg">
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config &&
          Object.entries(config).map(([key, value]) => {
            const isToken = key === "token";
            const isArray = Array.isArray(value);

            return (
              <div key={key}>
                <label className="block text-blue-300 mb-1 capitalize">
                  {key}
                </label>

                {isArray ? (
                  <textarea
                    rows={Math.max((value as string[]).length, 3)}
                    className="w-full p-3 bg-blue-900/40 border border-blue-600 rounded-md text-blue-100 font-mono resize-y"
                    value={(value as string[]).join("\n")}
                    onChange={(e) =>
                      handleChange(
                        key,
                        e.target.value.split("\n").filter(Boolean),
                      )
                    }
                  />
                ) : (
                  <input
                    type={isToken ? "password" : "text"}
                    className="w-full p-3 bg-blue-900/40 border border-blue-600 rounded-md text-blue-100 font-mono"
                    value={value as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </div>
            );
          })}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-200"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

export default Settings;
