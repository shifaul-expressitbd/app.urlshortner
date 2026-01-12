"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      // Adjust API call effectively
      const res = await api.post<{
        user: any;
        accessToken: string;
        refreshToken: string;
      }>("/auth/login", {
        ...data,
        rememberMe: true,
      });

      login(res.accessToken, res.refreshToken, res.user);
    } catch (error: any) {
      if (error.message === "Please verify your email") {
        toast.error("Please verify your email address");
        // Use window.location to redirect to ensure full page load if needed, or router.push
        window.location.href = `/verify-email?email=${encodeURIComponent(data.email)}`;
        return;
      }
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Redirect to backend OAuth endpoint which handles the passport strategy
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/google`;
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
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
            disabled={loading || googleLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={loading || googleLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading || googleLoading}
        >
          {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <LuLoader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="h-5 w-5" />
          )}
          Login with Google
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline">
          Sign up
        </a>
      </div>
    </div>
  );
}
