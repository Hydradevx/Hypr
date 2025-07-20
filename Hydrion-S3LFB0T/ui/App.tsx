import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Controls from "./pages/Controls";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import RpcEditor from "./pages/RpcEditor";
import { Toaster } from "sonner";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!loaded) return <LoadingScreen />;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "bg-[#0f172a] text-blue-300 border border-blue-800 shadow-lg rounded-xl px-4 py-3 font-sans",
          style: {
            backgroundColor: "#0f172a",
            color: "#93c5fd",
            borderColor: "#1e3a8a",
          },
          duration: 4000,
        }}
      />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/controls" element={<Controls />} />
            <Route path="/rpc" element={<RpcEditor />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
