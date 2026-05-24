import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Controls from "./pages/Controls";
import RpcEditor from "./pages/RpcEditor";
import CreateConfig from "./pages/createConfig";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [configExists, setConfigExists] =
    useState<boolean | null>(null);

  useEffect(() => {
    async function checkConfig() {
      try {
        const exists =
          await window.electron.ipcRenderer.invoke(
            "config:exists"
          );

        setConfigExists(exists);
      } catch (err) {
        console.error(err);
        setConfigExists(false);
      }
    }

    checkConfig();
  }, []);

  if (configExists === null) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-400 text-xl">
        Loading Hypr...
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "bg-card text-foreground border border-border shadow-lg rounded-xl px-4 py-3",
        }}
      />

      {!configExists ? (
        <CreateConfig
          onComplete={() => setConfigExists(true)}
        />
      ) : (
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/logs"
                element={<Logs />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              <Route
                path="/controls"
                element={<Controls />}
              />

              <Route
                path="/rpc"
                element={<RpcEditor />}
              />
            </Routes>
          </main>
        </div>
      )}
    </>
  )
}