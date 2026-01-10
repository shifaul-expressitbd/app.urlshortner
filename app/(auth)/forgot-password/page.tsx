"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api-client"
import { toast } from "sonner"
import { LuLoader, LuArrowLeft } from "react-icons/lu"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setLoading(true)
      
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      
      try {
          await api.post('/auth/forgot-password', { email })
          setSubmitted(true)
          toast.success("Reset link sent")
      } catch (error: any) {
          toast.error(error.message || "Failed to send reset link")
      } finally {
          setLoading(false)
      }
  }

  if (submitted) {
      return (
        <div className="grid gap-6 text-center">
            <h1 className="text-3xl font-bold">Check your email</h1>
            <p className="text-muted-foreground">
                We have sent a password reset link to your email address.
            </p>
            <Button asChild variant="outline" className="w-full">
                <Link href="/login">
                    <LuArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/login" className="underline flex items-center justify-center">
          <LuArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  )
}
