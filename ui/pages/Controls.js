import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function Controls() {
    const [servers, setServers] = useState([]);
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
    const handleServerChange = (e) => {
        setSelectedServerId(e.target.value);
        setSelectedChannelId("");
    };
    const handleSendCommand = async () => {
        if (!selectedChannelId || !command.trim())
            return;
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
    return (_jsxs("div", { className: "p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen h-full w-full", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-blue-400 drop-shadow-lg", children: "Command Executor" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Server:" }), _jsxs("select", { value: selectedServerId, onChange: handleServerChange, className: "w-full bg-blue-900 text-white p-2 rounded", children: [_jsx("option", { value: "", children: "Select a server" }), servers.map((server) => (_jsx("option", { value: server.id, children: server.name }, server.id)))] })] }), selectedServer && (_jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Channel:" }), _jsxs("select", { value: selectedChannelId, onChange: (e) => setSelectedChannelId(e.target.value), className: "w-full bg-blue-900 text-white p-2 rounded", children: [_jsx("option", { value: "", children: "Select a channel" }), selectedServer.channels.map((channel) => (_jsxs("option", { value: channel.id, children: ["#", channel.name] }, channel.id)))] })] })), _jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Command:" }), _jsx("input", { type: "text", value: command, onChange: (e) => setCommand(e.target.value), placeholder: "Enter command with arguments", className: "w-full bg-blue-900 text-white p-2 rounded" })] }), _jsx("button", { onClick: handleSendCommand, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow", children: "Send Command" }), response && (_jsx("div", { className: "mt-4 text-green-400 bg-blue-950 p-3 rounded shadow", children: response }))] })] }));
}
