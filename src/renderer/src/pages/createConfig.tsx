"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
import { Zap, ArrowRight, Check, Eye, EyeOff, Sparkles } from "lucide-react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { showError, showSuccess } from "../utils/toast"
import { Switch } from "../components/ui/switch"

interface CreateConfigViewProps {
  onComplete: () => void
}

type ConfigType = {
  token: string;
  prefix: string;
  safetyTime: number;
  rpc: boolean;
  autoreact: boolean;
  hasAccess: string[];
};

const steps = [
  { id: 1, title: "Welcome", description: "Let's get you set up" },
  { id: 2, title: "Token", description: "Connect your Discord account" },
  { id: 3, title: "Prefix", description: "Set your command prefix" },
  { id: 4, title: "Features", description: "Choose your modules" },
  { id: 5, title: "Done", description: "You're all set!" },
]

const features = [
  {
    id: "rpc",
    name: "Rich Presence",
    description: "Enable Discord Rich Presence",
  },
  {
    id: "autoreact",
    name: "Auto React",
    description: "Automatically react to messages",
  },
]

export default function CreateConfig({ onComplete }: CreateConfigViewProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showToken, setShowToken] = useState(false)
  const [saving, setSaving] = useState(false)
  const [config, setConfig] = useState<ConfigType>({
    token: "",
    prefix: ".",
    safetyTime: 5,
    rpc: true,
    autoreact: false,
    hasAccess: [],
  })

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChange = (
    key: keyof ConfigType,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const createConfig = async () => {
    if (!config.token.trim()) {
      showError("Token is required")
      return
    }

    try {
      setSaving(true)

      await window.electron.ipcRenderer.invoke(
        "config:create",
        config
      )

      showSuccess("Config created")

      onComplete()
    } catch (err) {
      console.error(err)
      showError("Failed to create config")
    } finally {
      setSaving(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to Hypr</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                A premium Discord selfbot dashboard. Let&apos;s configure your setup in just a few steps.
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Connect Your Account</h2>
              <p className="text-sm text-muted-foreground">
                Enter your Discord token to get started
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Discord Token</Label>
              <div className="relative">
                <Input
                  type={showToken ? "text" : "password"}
                  value={config.token}
                  onChange={(e) => setConfig({ ...config, token: e.target.value })}
                  placeholder="Enter your Discord token"
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your token is encrypted and stored locally
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Set Your Prefix</h2>
              <p className="text-sm text-muted-foreground">
                Choose a prefix for your commands
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Command Prefix</Label>
              <Input
                value={config.prefix}
                onChange={(e) => setConfig({ ...config, prefix: e.target.value })}
                placeholder="!"
                className="bg-secondary border-border text-center text-lg font-mono"
                maxLength={3}
              />
              <p className="text-xs text-muted-foreground text-center">
                Example: {config.prefix}help, {config.prefix}status
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Enable Features
              </h2>

              <p className="text-sm text-muted-foreground">
                Choose which modules to enable
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer",
                    config[
                      feature.id as keyof ConfigType
                    ] as boolean
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/50 border-border hover:border-border/80"
                  )}
                  onClick={() =>
                    handleChange(
                      feature.id as keyof ConfigType,
                      !config[
                        feature.id as keyof ConfigType
                      ]
                    )
                  }
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {feature.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <Switch
                    checked={
                      config[
                        feature.id as keyof ConfigType
                      ] as boolean
                    }
                    onCheckedChange={(checked) =>
                      handleChange(
                        feature.id as keyof ConfigType,
                        checked
                      )
                    }
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Safety Time (seconds)</Label>

              <Input
                type="number"
                value={config.safetyTime}
                onChange={(e) =>
                  handleChange(
                    "safetyTime",
                    Number(e.target.value)
                  )
                }
                className="bg-secondary border-border"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">You&apos;re All Set!</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Hypr is configured and ready to use. Click below to open your dashboard.
              </p>
            </div>
            <div className="pt-4">
              <button
                  onClick={createConfig}
                  disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {saving
                  ? "Creating Config..."
                  : "Open Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep > step.id
                    ? "bg-success text-success-foreground"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-1",
                    currentStep > step.id ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{steps[currentStep - 1].title}</p>
          <p className="text-xs text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex items-center gap-3 mt-6">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={currentStep === 2 && !config.token}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors",
              currentStep === 2 && !config.token
                ? "bg-secondary text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
