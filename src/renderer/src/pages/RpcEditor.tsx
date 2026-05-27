"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

import {
  Save,
  RotateCcw,
  Eye,
  Gamepad2,
  Clock,
  Link,
  Image as ImageIcon,
  Type,
  Trash2,
  Plus,
} from "lucide-react"

type RpcButton = {
  label: string
  url: string
}

type RpcData = {
  applicationId: string
  type: string
  name: string
  details: string
  state: string
  largeImageKey: string
  largeImageText: string
  smallImageKey: string
  smallImageText: string
  buttons: RpcButton[]
  showTimestamp: boolean
}

const activityTypes = [
  "PLAYING",
  "STREAMING",
  "LISTENING",
  "WATCHING",
  "COMPETING",
]

const defaultRpc: RpcData = {
  applicationId: "",
  type: "PLAYING",
  name: "",
  details: "",
  state: "",
  largeImageKey: "",
  largeImageText: "",
  smallImageKey: "",
  smallImageText: "",
  buttons: [
    {
      label: "",
      url: "",
    },
  ],
  showTimestamp: true,
}

export default function RpcEditor() {
  const [rpcData, setRpcData] =
    useState<RpcData>(defaultRpc)

  const [isSaving, setIsSaving] =
    useState(false)

  useEffect(() => {
    async function loadRpc() {
      try {
        const data =
          await window.hypr.getRPC()

        if (data) {
          setRpcData({
            ...defaultRpc,
            ...data,
            buttons:
              data.buttons?.length > 0
                ? data.buttons
                : [
                    {
                      label: "",
                      url: "",
                    },
                  ],
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadRpc()
  }, [])

  const handleChange = (
    key: keyof RpcData,
    value: any
  ) => {
    setRpcData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleButtonChange = (
    index: number,
    key: keyof RpcButton,
    value: string
  ) => {
    const updatedButtons = [
      ...rpcData.buttons,
    ]

    updatedButtons[index][key] = value

    setRpcData((prev) => ({
      ...prev,
      buttons: updatedButtons,
    }))
  }

  const addButton = () => {
    if (rpcData.buttons.length >= 2)
      return

    setRpcData((prev) => ({
      ...prev,
      buttons: [
        ...prev.buttons,
        {
          label: "",
          url: "",
        },
      ],
    }))
  }

  const removeButton = (index: number) => {
    setRpcData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter(
        (_, i) => i !== index
      ),
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      await window.hypr.setRPC(rpcData)

      setTimeout(() => {
        setIsSaving(false)
      }, 1000)
    } catch (err) {
      console.error(err)
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setRpcData(defaultRpc)
  }

  return (
    <div className="flex h-full">
      {/* Editor */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl space-y-6">
          {/* General */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-muted-foreground" />

              <h3 className="text-sm font-medium text-foreground">
                General
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  Application ID
                </label>

                <input
                  value={
                    rpcData.applicationId
                  }
                  onChange={(e) =>
                    handleChange(
                      "applicationId",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">
                  Activity Type
                </label>

                <select
                  value={rpcData.type}
                  onChange={(e) =>
                    handleChange(
                      "type",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                >
                  {activityTypes.map(
                    (type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">
                  Name
                </label>

                <input
                  value={rpcData.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                />
              </div>
            </div>
          </div>

          {/* Activity Text */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-muted-foreground" />

              <h3 className="text-sm font-medium text-foreground">
                Activity Text
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  Details
                </label>

                <input
                  value={rpcData.details}
                  onChange={(e) =>
                    handleChange(
                      "details",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">
                  State
                </label>

                <input
                  value={rpcData.state}
                  onChange={(e) =>
                    handleChange(
                      "state",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />

              <h3 className="text-sm font-medium text-foreground">
                Images
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                [
                  "largeImageKey",
                  "Large Image Key",
                ],
                [
                  "largeImageText",
                  "Large Image Text",
                ],
                [
                  "smallImageKey",
                  "Small Image Key",
                ],
                [
                  "smallImageText",
                  "Small Image Text",
                ],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground">
                    {label}
                  </label>

                  <input
                    value={
                      rpcData[
                        key as keyof RpcData
                      ] as string
                    }
                    onChange={(e) =>
                      handleChange(
                        key as keyof RpcData,
                        e.target.value
                      )
                    }
                    className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4 text-muted-foreground" />

                <h3 className="text-sm font-medium text-foreground">
                  Buttons
                </h3>
              </div>

              {rpcData.buttons.length <
                2 && (
                <button
                  onClick={addButton}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              )}
            </div>

            <div className="space-y-4">
              {rpcData.buttons.map(
                (button, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 relative"
                  >
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Label
                      </label>

                      <input
                        value={button.label}
                        onChange={(e) =>
                          handleButtonChange(
                            index,
                            "label",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                      />
                    </div>

                    <div className="relative">
                      <label className="text-xs text-muted-foreground">
                        URL
                      </label>

                      <input
                        value={button.url}
                        onChange={(e) =>
                          handleButtonChange(
                            index,
                            "url",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 h-10 px-3 rounded-lg bg-secondary border border-border outline-none"
                      />

                      <button
                        onClick={() =>
                          removeButton(
                            index
                          )
                        }
                        className="absolute top-8 right-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Options */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-muted-foreground" />

              <h3 className="text-sm font-medium text-foreground">
                Options
              </h3>
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={
                  rpcData.showTimestamp
                }
                onChange={(e) =>
                  handleChange(
                    "showTimestamp",
                    e.target.checked
                  )
                }
              />

              Show Timestamp
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                isSaving
                  ? "bg-green-500/20 text-green-400"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Save className="w-4 h-4" />

              {isSaving
                ? "Saved!"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="w-80 border-l border-border p-6 bg-card/50">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-muted-foreground" />

          <h3 className="text-sm font-medium text-foreground">
            Live Preview
          </h3>
        </div>

        <div className="rounded-lg bg-[#232428] p-4 border border-[#1e1f22]">
          <p className="text-[11px] text-[#b5bac1] uppercase font-semibold mb-2">
            {rpcData.type}
          </p>

          <div className="flex gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white">
                {rpcData.name ||
                  "Hypr"}
              </p>

              <p className="text-[13px] text-[#dbdee1] truncate">
                {rpcData.details}
              </p>

              <p className="text-[13px] text-[#dbdee1] truncate">
                {rpcData.state}
              </p>

              {rpcData.showTimestamp && (
                <p className="text-[13px] text-[#a3a6aa]">
                  00:42 elapsed
                </p>
              )}
            </div>
          </div>

          {rpcData.buttons.some(
            (b) => b.label
          ) && (
            <div className="mt-3 space-y-1.5">
              {rpcData.buttons.map(
                (button, i) =>
                  button.label && (
                    <button
                      key={i}
                      className="w-full py-1.5 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-[13px] font-medium text-white transition-colors"
                    >
                      {button.label}
                    </button>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}