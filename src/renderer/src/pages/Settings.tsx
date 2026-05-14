import { useEffect, useState } from "react";
import { showError, showSuccess } from "../utils/toast";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";
import Layout from "../components/Layout";

type Config = {
  token: string;
  [key: string]: any;
};

export default function Settings() {
  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];

  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await window.hypr.getConfig();
        setConfig(data);
        
      } catch (err) {
        console.error(err);
        showError("Failed to load config");
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  const handleChange = (
    key: string,
    value: string | string[] | boolean | number,
  ) => {
    setConfig((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : prev,
    );
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);

    try {
      await window.hypr.saveConfig(config);

      showSuccess("Config saved");
    } catch (err) {
      console.error(err);
      showError("Failed to save config");
    } finally {
      setSaving(false);
    }
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
        <h1 className="text-3xl font-bold mb-6 drop-shadow-lg">
          Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config &&
            Object.entries(config).map(([key, value]) => {
              const isToken = key === "token";
              const isArray = Array.isArray(value);
              const isBoolean =
                typeof value === "boolean";
              const isNumber =
                typeof value === "number";

              return (
                <div
                  key={key}
                  className="space-y-2"
                >
                  <label
                    className={`block capitalize text-sm font-medium ${activeTheme.highlight}`}
                  >
                    {key}
                  </label>

                  {isArray ? (
                    <textarea
                      rows={Math.max(value.length, 3)}
                      className={`w-full p-3 rounded-xl font-mono resize-y border outline-none transition-all
                        ${activeTheme.input}
                        ${activeTheme.inputBorder}`}
                      value={value.join("\n")}
                      onChange={(e) =>
                        handleChange(
                          key,
                          e.target.value
                            .split("\n")
                            .filter(Boolean),
                        )
                      }
                    />
                  ) : isBoolean ? (
                    <select
                      className={`w-full p-3 rounded-xl border outline-none transition-all
                        ${activeTheme.input}
                        ${activeTheme.inputBorder}`}
                      value={String(value)}
                      onChange={(e) =>
                        handleChange(
                          key,
                          e.target.value === "true",
                        )
                      }
                    >
                      <option value="true">
                        true
                      </option>

                      <option value="false">
                        false
                      </option>
                    </select>
                  ) : (
                    <input
                      type={
                        isToken
                          ? "password"
                          : isNumber
                            ? "number"
                            : "text"
                      }
                      className={`w-full p-3 rounded-xl font-mono border outline-none transition-all
                        ${activeTheme.input}
                        ${activeTheme.inputBorder}`}
                      value={value}
                      onChange={(e) =>
                        handleChange(
                          key,
                          isNumber
                            ? Number(
                                e.target.value,
                              )
                            : e.target.value,
                        )
                      }
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
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200
              ${activeTheme.button}
              ${activeTheme.buttonHover}
              ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </div>
    </Layout>
  );
}