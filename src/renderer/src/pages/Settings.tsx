import { useEffect, useState } from "react";
import { showError, showSuccess } from "../utils/toast";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";
import Layout from "../components/Layout";

type Config = {
  token: string;
  [key: string]: string | string[];
};

export default function Settings() {
  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];
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
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
      <Layout>
        <div
          className={`p-6 font-sans w-full h-screen ${activeTheme.background} ${activeTheme.text}`}
        >
          Loading settings...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={`p-6 min-h-screen w-full font-sans ${activeTheme.background} ${activeTheme.text}`}
      >
        <h1 className="text-3xl font-bold mb-6 drop-shadow-lg">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config &&
            Object.entries(config).map(([key, value]) => {
              const isToken = key === "token";
              const isArray = Array.isArray(value);

              return (
                <div key={key}>
                  <label className={`block mb-1 capitalize ${activeTheme.text}`}>
                    {key}
                  </label>

                  {isArray ? (
                    <textarea
                      rows={Math.max((value as string[]).length, 3)}
                      className={`w-full p-3 rounded-md font-mono resize-y border ${activeTheme.background} ${activeTheme.text} ${activeTheme.glow}`}
                      value={(value as string[]).join("\n")}
                      onChange={(e) =>
                        handleChange(
                          key,
                          e.target.value.split("\n").filter(Boolean)
                        )
                      }
                    />
                  ) : (
                    <input
                      type={isToken ? "password" : "text"}
                      className={`w-full p-3 rounded-md font-mono border ${activeTheme.background} ${activeTheme.text} ${activeTheme.glow}`}
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
            className={`px-6 py-3 rounded-lg transition-all duration-200 ${activeTheme.background} ${activeTheme.text} ${activeTheme.glow} ${activeTheme.hover}`}
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
