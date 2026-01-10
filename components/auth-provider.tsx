"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  systemRole: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, refreshToken: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  mutate: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  mutate: () => {},
});

export const useAuth = () => useContext(AuthContext);

const fetcher = (url: string) => api.get<User>(url).catch(() => null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies on mount
    const tokenExists = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("access_token="));
    setHasToken(tokenExists);
  }, []);

  // Poll /auth/profile to sync session state
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User | null>(hasToken ? "/users/profile" : null, fetcher, {
    refreshInterval: 5 * 60 * 1000, // Sync every 5 mins
    shouldRetryOnError: false,
    revalidateOnFocus: true,
  });

  const login = (token: string, refreshToken: string, userData: User) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
    }

    // Cookie is HttpOnly set by server (except for manual login where we might need to rely on proxy)
    // But ideally, the login endpoint itself sets the cookie.
    // However, if the manual login returns a token, we should probably let the proxy handle it or just rely on the SWR revalidation.
    // For now, we assume the login API call succeeded and set the user immediately for UX
    mutate(userData, false);
    toast.success(`Welcome back, ${userData.firstName}!`);

    // Safely get callbackUrl, defaulting to /dashboard
    let callbackUrl = "/dashboard";
    if (searchParams) {
      callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    }

    console.log(`Redirecting to: ${callbackUrl}`);

    // Set cookie for ApiClient to pick up
    // Refresh token slightly longer life or same as backend (7 days?)
    document.cookie = `access_token=${token}; path=/; max-age=900; SameSite=Lax`; // 15 mins matching backend
    document.cookie = `refresh_token=${refreshToken}; path=/; max-age=604800; SameSite=Lax`; // 7 days
    setHasToken(true);

    // Force a hard navigation to ensure state is fresh and avoid router issues
    window.location.href = callbackUrl;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (e) {
      // ignore
    }
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "refresh_token=; path=/; max-age=0";
    setHasToken(false);
    mutate(null, false);
    router.push("/login");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
