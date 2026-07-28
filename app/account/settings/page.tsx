"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Lock, ShieldCheck, MoonStar, Globe2, Smartphone, Check, Loader2 } from "lucide-react"

interface Profile {
  name: string
  email: string
  phone: string
}

const defaultPreferences = {
  email: true,
  sms: false,
  promos: true,
  recommendations: true,
  privacy: false,
  theme: "system",
}

const settings = [
  { icon: Bell, title: "Notifications", description: "Order updates, promotions, and style reminders." },
  { icon: Lock, title: "Password", description: "Update your login credentials and recovery info." },
  { icon: ShieldCheck, title: "Privacy", description: "Manage what data is visible to creators and sellers." },
  { icon: MoonStar, title: "Appearance", description: "Switch between light and dark themes." },
  { icon: Globe2, title: "Language", description: "Choose your preferred language and region." },
  { icon: Smartphone, title: "Devices", description: "Review active sessions and connected devices." },
]

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const json = await res.json()
          if (!cancelled) {
            setProfile({ name: json.user.name || "", email: json.user.email, phone: json.user.phone || "" })
          }
        }
      } catch {
        // profile section will just show empty fields
      } finally {
        if (!cancelled) setLoading(false)
      }

      // Notification/theme preferences have no backend table yet — these
      // stay client-side (localStorage) intentionally, not as a shortcut.
      const saved = localStorage.getItem("pim-preferences")
      if (saved && !cancelled) {
        try {
          setPreferences({ ...defaultPreferences, ...JSON.parse(saved) })
        } catch {
          // ignore malformed local data
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const saveSettings = async () => {
    if (!profile) return
    setSaving(true)
    setSaveMessage(null)
    try {
      await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name, phone: profile.phone }),
      })
      localStorage.setItem("pim-preferences", JSON.stringify(preferences))
      setSaveMessage("Settings saved")
    } catch {
      setSaveMessage("Couldn't save — please try again")
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMessage(null), 2500)
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-[#c9a84c]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">Settings</h1>
        <div className="flex items-center gap-3">
          {saveMessage && <span className="text-sm text-[#a89070]">{saveMessage}</span>}
          <Button onClick={saveSettings} disabled={saving} className="rounded-xl bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black gap-2">
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6 space-y-5 h-fit">
          <h2 className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">Account</h2>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#a89070] mb-2 block">Full name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full rounded-xl border border-[#e8e0d4] dark:border-[#2a1f14] bg-transparent px-3 py-2 text-sm text-[#1a1108] dark:text-[#faf8f5] placeholder:text-[#a89070]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[#a89070] mb-2 block">Email address</label>
            <input
              value={profile.email}
              disabled
              className="w-full rounded-xl border border-[#e8e0d4] dark:border-[#2a1f14] bg-[#faf8f5] dark:bg-[#0e0a06] px-3 py-2 text-sm text-[#a89070]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[#a89070] mb-2 block">Phone number</label>
            <input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full rounded-xl border border-[#e8e0d4] dark:border-[#2a1f14] bg-transparent px-3 py-2 text-sm text-[#1a1108] dark:text-[#faf8f5] placeholder:text-[#a89070]"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-[#a89070] mb-2">Theme preference</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["system", "System"],
                ["light", "Light"],
                ["dark", "Dark"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setPreferences((prev) => ({ ...prev, theme: value }))}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    preferences.theme === value
                      ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#3d2c1e] dark:text-[#faf8f5]"
                      : "border-[#e8e0d4] dark:border-[#2a1f14] text-[#6b5744] dark:text-[#a89070]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {settings.map((setting) => {
            const Icon = setting.icon
            return (
              <div key={setting.title} className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4.5 w-4.5 text-[#c9a84c]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">{setting.title}</p>
                  <p className="text-sm text-[#a89070] mt-1">{setting.description}</p>
                </div>
              </div>
            )
          })}

          <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 space-y-3">
            <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">Notification controls</p>
            {[
              ["email", "Email order updates"],
              ["sms", "SMS delivery alerts"],
              ["promos", "Promotional offers"],
              ["recommendations", "Style recommendations"],
              ["privacy", "Share anonymous usage data"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPreferences((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className="w-full flex items-center justify-between rounded-xl border border-[#e8e0d4] dark:border-[#2a1f14] px-4 py-3 text-left"
              >
                <span className="text-sm text-[#3d2c1e] dark:text-[#faf8f5]">{label}</span>
                <span
                  className={`inline-flex h-6 w-11 items-center rounded-full p-1 transition ${
                    preferences[key as keyof typeof preferences] ? "bg-[#c9a84c]" : "bg-[#e8e0d4] dark:bg-[#2a1f14]"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white transition ${
                      preferences[key as keyof typeof preferences] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-2xl border border-[#c9a84c]/20 p-5 flex items-center gap-4">
            <Check className="h-5 w-5 text-[#c9a84c] flex-shrink-0" />
            <p className="text-sm text-[#3d2c1e] dark:text-[#faf8f5]">
              Name and phone save to your account. Notification and theme preferences are saved on this device only
              for now.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
