"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api-client"
import { toast } from "sonner"
import { LuLoader } from "react-icons/lu"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setLoading(true)
      
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      
      try {
          await api.post('/auth/register', {
              email,
              password,
              firstName,
              lastName
          })
          
          toast.success("Account created successfully. Please check your email.")
          router.push(`/verify-email?email=${encodeURIComponent(email)}`)
      } catch (error: any) {
          toast.error(error.message || "Registration failed")
      } finally {
          setLoading(false)
      }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to get started
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" placeholder="Max" required disabled={loading} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" placeholder="Robinson" required disabled={loading} />
          </div>
        </div>
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
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required disabled={loading} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
        <Button variant="outline" className="w-full gap-2" type="button" disabled={loading}>
          <FcGoogle className="h-5 w-5" />
          Sign up with Google
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Sign in
        </a>
      </div>
    </div>
  )
}
