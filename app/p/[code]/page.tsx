"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api-client"; // Assuming this is the correct path based on previous context
import { LuLock, LuLoader, LuArrowRight, LuCircleAlert } from "react-icons/lu";
import { toast } from "sonner";

interface VerifyPasswordResponse {
    success: boolean;
    redirectUrl: string;
}

export default function PasswordPage({ params }: { params: Promise<{ code: string }> }) {
    // Unwrap params using React.use()
    const { code } = use(params);

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setLoading(true);
        setError("");

        try {
            // The endpoint is likely /s/:code/verify based on backend controller research
            // We need to use valid json body
            const res = await api.post<VerifyPasswordResponse>(`/s/${code}/verify`, { password });

            if (res.success && res.redirectUrl) {
                toast.success("Password verified! Redirecting...");
                window.location.href = res.redirectUrl;
            }
        } catch (err: any) {
            console.error(err);
            // Backend returns 403 for invalid password
            setError("Invalid password. Please try again.");
            toast.error("Incorrect password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <CardHeader className="space-y-1 text-center pb-2">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                        <LuLock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Protected Link</CardTitle>
                    <CardDescription>
                        This URL is password protected. <br /> Please enter the password to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                                autoFocus
                            />
                            {error && (
                                <div className="flex items-center gap-2 text-sm text-destructive animate-in fade-in slide-in-from-left-1">
                                    <LuCircleAlert className="h-4 w-4" />
                                    {error}
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading || !password}
                        >
                            {loading ? (
                                <>
                                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <LuArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
