"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login, loginWithGoogle } from "../actions/actions"

export default function LoginPage() {
  const t = useTranslations("login")
  const locale = useLocale()
  const isRTL = locale === "ar" || locale === "he"

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await login(formData)

      console.log("login result",result)

      if (!result.success) {
        toast.error(result.error)
      } else {
        toast.success("hllo")
      }
    } catch (err: any) {
      toast.error(t("error"))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
    } catch {
      toast.error(t("error"))
      setGoogleLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-background flex items-center justify-center p-4 ${isRTL ? "direction-rtl text-right" : ""}`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <span className="text-xl font-bold">Pagix</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">{t("email")}</label>
            <Input id="email" required name="email" type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">{t("password")}</label>
            <Input id="password" required name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              {t("remember")}
            </label>
            <Link href="#" className="text-primary hover:underline">
              {t("forgot")}
            </Link>
          </div>

          <Button disabled={loading} className="w-full" size="lg">
            {loading ? t("signinLoading") : t("signin")}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">{t("divider")}</span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          type="button"
        >
          {googleLoading ? t("googleLoading") : t("google")}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-muted-foreground mt-6">
          {t("noAccount")}{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            {t("signup")}
          </Link>
        </p>
      </div>
    </div>
  )
}
