import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { showSuccess } from "../utils/toast";
const types = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"];
export default function RpcEditor() {
    const [rpc, setRpc] = useState({
        applicationId: "",
        type: "PLAYING",
        name: "",
        details: "",
        largeImageKey: "",
        largeImageText: "",
        buttons: [{ label: "", url: "" }],
    });
    const [presets, setPresets] = useState({});
    const [presetName, setPresetName] = useState("");
    useEffect(() => {
        fetch("/api/rpc/current")
            .then((res) => res.json())
            .then(setRpc);
        fetch("/api/rpc/presets")
            .then((res) => res.json())
            .then(setPresets);
    }, []);
    const handleChange = (key, value) => {
        setRpc({ ...rpc, [key]: value });
    };
    const handleButtonChange = (i, key, value) => {
        const newButtons = [...rpc.buttons];
        newButtons[i][key] = value;
        setRpc({ ...rpc, buttons: newButtons });
    };
    const addButton = () => {
        setRpc({ ...rpc, buttons: [...rpc.buttons, { label: "", url: "" }] });
    };
    const deleteButton = (index) => {
        const newButtons = rpc.buttons.filter((_, i) => i !== index);
        setRpc({ ...rpc, buttons: newButtons });
    };
    const updateRpc = async () => {
        await fetch("/api/rpc/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rpc),
        });
        showSuccess("RPC updated");
    };
    const savePreset = async () => {
        if (!presetName)
            return alert("Preset name required");
        await fetch("/api/rpc/presets/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: presetName, data: rpc }),
        });
        showSuccess("Preset saved");
        const res = await fetch("/api/rpc/presets");
        setPresets(await res.json());
    };
    const loadPreset = async (name) => {
        await fetch("/api/rpc/presets/load", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        const res = await fetch("/api/rpc/current");
        setRpc(await res.json());
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black p-8 text-white", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-zinc-900/80 border border-blue-900 rounded-2xl shadow-xl p-8 space-y-8", children: [_jsx("h1", { className: "text-3xl font-bold text-blue-400 drop-shadow-[0_0_6px_#3b82f6]", children: "RPC Editor" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Application ID" }), _jsx("input", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", placeholder: "Application ID", value: rpc.applicationId, onChange: (e) => handleChange("applicationId", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Activity Type" }), _jsx("select", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: rpc.type, onChange: (e) => handleChange("type", e.target.value), children: types.map((t) => (_jsx("option", { value: t, children: t }, t))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Name" }), _jsx("input", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: rpc.name, onChange: (e) => handleChange("name", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Details" }), _jsx("input", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: rpc.details, onChange: (e) => handleChange("details", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Large Image Key" }), _jsx("input", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: rpc.largeImageKey, onChange: (e) => handleChange("largeImageKey", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Large Image Text" }), _jsx("input", { className: "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: rpc.largeImageText, onChange: (e) => handleChange("largeImageText", e.target.value) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-blue-300", children: "Buttons" }), _jsxs("button", { onClick: addButton, className: "flex items-center gap-1 text-sm bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition", children: [_jsx(Plus, { className: "w-4 h-4" }), " Add Button"] })] }), _jsx("div", { className: "space-y-4", children: rpc.buttons.map((btn, i) => (_jsxs("div", { className: "grid md:grid-cols-2 gap-4 items-start bg-zinc-800 p-4 rounded-xl border border-zinc-700", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm text-blue-300", children: "Label" }), _jsx("input", { className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: btn.label, onChange: (e) => handleButtonChange(i, "label", e.target.value), placeholder: `Button ${i + 1} Label` })] }), _jsxs("div", { className: "space-y-2 relative", children: [_jsx("label", { className: "text-sm text-blue-300", children: "URL" }), _jsx("input", { className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm", value: btn.url, onChange: (e) => handleButtonChange(i, "url", e.target.value), placeholder: `Button ${i + 1} URL` }), _jsx("button", { onClick: () => deleteButton(i), className: "absolute top-0 right-0 text-red-500 hover:text-red-400 p-2", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }, i))) })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { className: "bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium shadow-md transition", onClick: updateRpc, children: "Update RPC" }) }), _jsxs("div", { className: "border-t border-blue-900 pt-6 space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold text-blue-300", children: "Presets" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm w-full", placeholder: "New Preset Name", value: presetName, onChange: (e) => setPresetName(e.target.value) }), _jsx("button", { className: "bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition", onClick: savePreset, children: "Save Preset" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: Object.keys(presets).map((name) => (_jsx("button", { className: "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-sm text-blue-300 px-3 py-1.5 rounded-lg shadow-sm transition", onClick: () => loadPreset(name), children: name }, name))) })] })] }) }));
}
