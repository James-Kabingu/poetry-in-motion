"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Camera, Mail, Phone, Calendar, Edit2, Save, X, Trash2, LogOut, CheckCircle, Loader2 } from "lucide-react"

interface Profile {
  name: string
  email: string
  phone: string
  dob: string
  styleTags: string[]
  createdAt: string
}

function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long" })
}

export default function AccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Profile | null>(null)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/auth/me")
        if (res.status === 401) {
          router.push("/auth/login")
          return
        }
        if (!res.ok) throw new Error("Failed to load profile")
        const json = await res.json()
        const u = json.user
        const loaded: Profile = {
          name: u.name || "",
          email: u.email,
          phone: u.phone || "",
          dob: u.dob || "",
          styleTags: u.stylePreferences || [],
          createdAt: u.createdAt,
        }
        if (!cancelled) {
          setProfile(loaded)
          setDraft(loaded)
        }
      } catch (err) {
        if (!cancelled) setError("Couldn't load your profile. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [router])

  const handleEdit = () => {
    setDraft(profile)
    setEditing(true)
  }

  const handleSave = async () => {
    if (!draft || !profile) return
    setSaving(true)
    try {
      const requests: Promise<Response>[] = [
        fetch("/api/auth/me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: draft.name, phone: draft.phone, dob: draft.dob }),
        }),
      ]
      if (JSON.stringify(draft.styleTags) !== JSON.stringify(profile.styleTags)) {
        requests.push(
          fetch("/api/style-profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stylePreferences: draft.styleTags }),
          }),
        )
      }
      await Promise.all(requests)
      setProfile(draft)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError("Couldn't save your changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setDraft(profile)
    setEditing(false)
  }

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {
      // proceed regardless
    }
    router.push("/")
  }

  const removeTag = (tag: string) => {
    setDraft((prev) => (prev ? { ...prev, styleTags: prev.styleTags.filter((t) => t !== tag) } : prev))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-[#c9a84c]" />
      </div>
    )
  }

  if (error && !profile) {
    return <p className="text-[#1a1108] dark:text-[#faf8f5]">{error}</p>
  }

  if (!profile || !draft) return null

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">My Profile</h1>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle className="h-4 w-4" /> Saved
            </span>
          )}
          {editing ? (
            <>
              <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2 rounded-xl border-[#e8e0d4] dark:border-[#2a1f14] bg-transparent text-sm" disabled={saving}>
                <X className="h-3.5 w-3.5" /> Cancel
              </Button>
              <Button onClick={handleSave} size="sm" className="gap-2 rounded-xl bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black text-sm" disabled={saving}>
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} variant="outline" size="sm" className="gap-2 border-[#e8e0d4] dark:border-[#2a1f14] text-[#3d2c1e] dark:text-[#faf8f5] hover:border-[#c9a84c] hover:text-[#c9a84c] rounded-xl text-sm bg-transparent">
              <Edit2 className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile header card */}
      <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-[#3d2c1e] to-[#c9a84c]/60">
          <Image src="/images/banners/shopping.png" alt="Banner" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center opacity-30" />
        </div>
        <div className="px-6 pb-6">
          <div className="relative -mt-10 mb-4 inline-block">
            <div className="relative h-20 w-20 rounded-full border-4 border-white dark:border-[#1a1108] bg-[#c9a84c]/20 overflow-hidden">
              <Image src="/images/illustrations/empty/profile.png" alt="Profile" fill sizes="80px" className="object-cover" />
            </div>
            {editing && (
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#c9a84c] flex items-center justify-center border-2 border-white dark:border-[#1a1108] hover:bg-[#b8973b] transition">
                <Camera className="h-3.5 w-3.5 text-black" />
              </button>
            )}
          </div>
          {editing ? (
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="text-xl font-bold text-[#1a1108] dark:text-[#faf8f5] bg-transparent border-b-2 border-[#c9a84c] focus:outline-none w-full max-w-xs mb-1"
            />
          ) : (
            <h2 className="text-xl font-bold text-[#1a1108] dark:text-[#faf8f5]">{profile.name || "Not set"}</h2>
          )}
          <p className="text-sm text-[#a89070]">Member since {formatMemberSince(profile.createdAt)}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-4 w-4 text-[#c9a84c]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#a89070] mb-1">Email address</p>
            <p className="text-sm font-medium text-[#1a1108] dark:text-[#faf8f5]">{profile.email}</p>
          </div>
        </div>
        {[
          { icon: Phone, label: "Phone number", field: "phone" as const, type: "tel" },
          { icon: Calendar, label: "Date of birth", field: "dob" as const, type: "date" },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-[#c9a84c]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#a89070] mb-1">{item.label}</p>
                {editing ? (
                  <input
                    type={item.type}
                    value={draft[item.field]}
                    onChange={(e) => setDraft({ ...draft, [item.field]: e.target.value })}
                    placeholder={`Enter ${item.label.toLowerCase()}`}
                    className="w-full text-sm font-medium text-[#1a1108] dark:text-[#faf8f5] bg-transparent border-b border-[#c9a84c]/50 focus:border-[#c9a84c] focus:outline-none pb-0.5"
                  />
                ) : (
                  <p className="text-sm font-medium text-[#1a1108] dark:text-[#faf8f5]">
                    {profile[item.field] || <span className="text-[#a89070]">Not set</span>}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Style profile */}
      <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">Style Profile</h3>
          <Link href="/quiz" className="text-xs text-[#c9a84c] hover:underline">Retake quiz</Link>
        </div>
        {(editing ? draft.styleTags : profile.styleTags).length === 0 ? (
          <p className="text-sm text-[#a89070]">No style tags yet — take the quiz to build your profile.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(editing ? draft.styleTags : profile.styleTags).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 text-xs font-medium text-[#3d2c1e] dark:text-[#c9a84c] border border-[#c9a84c]/20">
                {tag}
                {editing && (
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/account/orders" className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 text-center hover:border-[#c9a84c]/40 transition">
          <p className="text-sm font-medium text-[#3d2c1e] dark:text-[#faf8f5]">Orders</p>
        </Link>
        <Link href="/account/wishlist" className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 text-center hover:border-[#c9a84c]/40 transition">
          <p className="text-sm font-medium text-[#3d2c1e] dark:text-[#faf8f5]">Wishlist</p>
        </Link>
      </div>

      {/* Account actions */}
      <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6 space-y-3">
        <h3 className="font-semibold text-[#1a1108] dark:text-[#faf8f5] mb-4">Account Actions</h3>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e8e0d4] dark:border-[#2a1f14] hover:bg-[#faf8f5] dark:hover:bg-[#2a1f14] transition text-left"
        >
          <LogOut className="h-4 w-4 text-[#a89070]" />
          <span className="text-sm text-[#3d2c1e] dark:text-[#faf8f5]">Sign Out</span>
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-left"
        >
          <Trash2 className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-500">Delete Account</span>
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-[#1a1108] dark:text-[#faf8f5] mb-2">Delete Account</h3>
            <p className="text-sm text-[#a89070] mb-4">
              Account deletion isn't available yet — there's no backend support for it. Contact support if you need
              your data removed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-[#e8e0d4] dark:border-[#2a1f14]"
                onClick={() => { setShowDeleteModal(false); setDeleteConfirm("") }}
              >
                Close
              </Button>
              <Button asChild className="flex-1 bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black">
                <Link href="/support">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
