import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../utils/toast";
function Settings() {
    const [config, setConfig] = useState(null);
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
    const handleChange = (key, value) => {
        setConfig((prev) => (prev ? { ...prev, [key]: value } : prev));
    };
    const handleSave = () => {
        if (!config)
            return;
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
        return (_jsx("div", { className: "text-blue-300 p-6 font-sans bg-black h-screen w-full", children: "Loading settings..." }));
    }
    return (_jsxs("div", { className: "p-6 text-white font-sans bg-gradient-to-br from-black via-blue-950 to-black min-h-screen w-full", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-blue-400 drop-shadow-lg", children: "Settings" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: config &&
                    Object.entries(config).map(([key, value]) => {
                        const isToken = key === "token";
                        const isArray = Array.isArray(value);
                        return (_jsxs("div", { children: [_jsx("label", { className: "block text-blue-300 mb-1 capitalize", children: key }), isArray ? (_jsx("textarea", { rows: Math.max(value.length, 3), className: "w-full p-3 bg-blue-900/40 border border-blue-600 rounded-md text-blue-100 font-mono resize-y", value: value.join("\n"), onChange: (e) => handleChange(key, e.target.value.split("\n").filter(Boolean)) })) : (_jsx("input", { type: isToken ? "password" : "text", className: "w-full p-3 bg-blue-900/40 border border-blue-600 rounded-md text-blue-100 font-mono", value: value, onChange: (e) => handleChange(key, e.target.value) }))] }, key));
                    }) }), _jsx("div", { className: "mt-8", children: _jsx("button", { onClick: handleSave, disabled: saving, className: "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-200", children: saving ? "Saving..." : "Save Settings" }) })] }));
}
export default Settings;
