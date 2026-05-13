import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { showSuccess } from "../utils/toast";
import { useThemeStore } from "../lib/useThemeStore";
import { themes as themeConfig } from "../lib/themeConfig";
import Layout from "../components/Layout";

const types = [
  "PLAYING",
  "STREAMING",
  "LISTENING",
  "WATCHING",
  "COMPETING",
];

export default function RpcEditor() {
  const { theme } = useThemeStore();
  const activeTheme = themeConfig[theme];

  const [rpc, setRpc] = useState({
    applicationId: "",
    type: "PLAYING",
    name: "",
    details: "",
    largeImageKey: "",
    largeImageText: "",
    buttons: [{ label: "", url: "" }],
  });

  useEffect(() => {
    const loadRpc = async () => {
      try {
        const data: any = await window.hypr.getRPC();

        if (data) {
          setRpc(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadRpc();
  }, []);

  const handleChange = (
    key: string,
    value: any
  ) => {
    setRpc({
      ...rpc,
      [key]: value,
    });
  };

  const handleButtonChange = (
    i: number,
    key: string,
    value: string
  ) => {
    const newButtons = [...rpc.buttons];

    newButtons[i][key] = value;

    setRpc({
      ...rpc,
      buttons: newButtons,
    });
  };

  const addButton = () => {
    setRpc({
      ...rpc,
      buttons: [
        ...rpc.buttons,
        {
          label: "",
          url: "",
        },
      ],
    });
  };

  const deleteButton = (
    index: number
  ) => {
    const newButtons =
      rpc.buttons.filter(
        (_, i) => i !== index
      );

    setRpc({
      ...rpc,
      buttons: newButtons,
    });
  };

  const updateRpc = async () => {
    try {
      await window.hypr.setRPC(rpc);

      showSuccess("RPC updated");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div
        className={`min-h-screen p-8 ${activeTheme.background} ${activeTheme.text}`}
      >
        <div
          className={`max-w-4xl mx-auto rounded-2xl p-8 space-y-8 border ${activeTheme.glow} bg-opacity-80 bg-black/40`}
        >
          <h1
            className={`text-3xl font-bold drop-shadow ${activeTheme.highlight}`}
          >
            RPC Editor
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              [
                "Application ID",
                "applicationId",
              ],
              [
                "Activity Type",
                "type",
              ],
              ["Name", "name"],
              ["Details", "details"],
              [
                "Large Image Key",
                "largeImageKey",
              ],
              [
                "Large Image Text",
                "largeImageText",
              ],
            ].map(([label, key]) => (
              <div
                key={key}
                className="space-y-2"
              >
                <label
                  className={`text-sm ${activeTheme.highlight}`}
                >
                  {label}
                </label>

                {key === "type" ? (
                  <select
                    className={`w-full ${activeTheme.input} ${activeTheme.inputBorder} rounded-lg px-4 py-2 text-sm`}
                    value={rpc[key as any]}
                    onChange={(e) =>
                      handleChange(
                        key,
                        e.target.value
                      )
                    }
                  >
                    {types.map((t) => (
                      <option
                        key={t}
                        value={t}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={`w-full ${activeTheme.input} ${activeTheme.inputBorder} rounded-lg px-4 py-2 text-sm`}
                    value={rpc[key as any]}
                    onChange={(e) =>
                      handleChange(
                        key,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2
                className={`text-xl font-semibold ${activeTheme.highlight}`}
              >
                Buttons
              </h2>

              <button
                onClick={addButton}
                className={`flex items-center gap-1 text-sm ${activeTheme.button} ${activeTheme.buttonHover} px-3 py-1 rounded-lg transition`}
              >
                <Plus className="w-4 h-4" />
                Add Button
              </button>
            </div>

            <div className="space-y-4">
              {rpc.buttons.map(
                (btn, i) => (
                  <div
                    key={i}
                    className={`grid md:grid-cols-2 gap-4 items-start ${activeTheme.input} p-4 rounded-xl ${activeTheme.inputBorder}`}
                  >
                    <div className="space-y-2">
                      <label
                        className={`text-sm ${activeTheme.highlight}`}
                      >
                        Label
                      </label>

                      <input
                        className={`w-full ${activeTheme.input} ${activeTheme.inputBorder} rounded-lg px-4 py-2 text-sm`}
                        value={btn.label}
                        onChange={(e) =>
                          handleButtonChange(
                            i,
                            "label",
                            e.target.value
                          )
                        }
                        placeholder={`Button ${
                          i + 1
                        } Label`}
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <label
                        className={`text-sm ${activeTheme.highlight}`}
                      >
                        URL
                      </label>

                      <input
                        className={`w-full ${activeTheme.input} ${activeTheme.inputBorder} rounded-lg px-4 py-2 text-sm`}
                        value={btn.url}
                        onChange={(e) =>
                          handleButtonChange(
                            i,
                            "url",
                            e.target.value
                          )
                        }
                        placeholder={`Button ${
                          i + 1
                        } URL`}
                      />

                      <button
                        onClick={() =>
                          deleteButton(i)
                        }
                        className="absolute top-0 right-0 text-red-500 hover:text-red-400 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              className={`px-6 py-2 rounded-xl font-medium shadow-md transition ${activeTheme.button} ${activeTheme.buttonHover}`}
              onClick={updateRpc}
            >
              Update RPC
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}