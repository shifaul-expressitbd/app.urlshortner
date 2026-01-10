"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api-client"
import { toast } from "sonner"
import { LuLoader, LuArrowLeft } from "react-icons/lu"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      
      if (!token) {
          toast.error("Invalid or missing reset token")
          return
      }

      setLoading(true)
      
      const formData = new FormData(e.currentTarget)
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string

      if (password !== confirmPassword) {
          toast.error("Passwords do not match")
          setLoading(false)
          return
      }
      
      try {
          await api.post('/auth/reset-password', { token, password })
          toast.success("Password reset successfully")
          router.push('/login')
      } catch (error: any) {
          toast.error(error.message || "Failed to reset password")
      } finally {
          setLoading(false)
      }
  }

  if (!token) {
      return (
        <div className="text-center">
            <h3 className="text-lg font-medium text-destructive">Invalid Link</h3>
            <p className="text-muted-foreground mb-4">The password reset link is invalid or has expired.</p>
            <Button asChild variant="outline">
                <Link href="/login">Return to Login</Link>
            </Button>
        </div>
      )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" required disabled={loading} />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required disabled={loading} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
            {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
        </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your new password below.
        </p>
      </div>
      <Suspense fallback={<div className="flex justify-center"><LuLoader className="animate-spin" /></div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
