"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api-client"
import { toast } from "sonner"
import { LuLoader, LuCheck, LuMail, LuArrowRight } from "react-icons/lu"
import Link from "next/link"

function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'idle'>(token ? 'verifying' : 'idle')

    useEffect(() => {
        if (!token) return

        async function verify() {
            try {
                // Assuming POST /auth/verify-email based on standard practices
                // Adjust endpoint if backend differs (e.g. GET /auth/verify-email/:token)
                await api.post('/auth/verify-email', { token })
                setStatus('success')
                toast.success("Email verified successfully")
            } catch (error: any) {
                console.error(error)
                setStatus('error')
                toast.error(error.message || "Failed to verify email")
            }
        }

        verify()
    }, [token])

    if (status === 'verifying') {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <LuLoader className="h-12 w-12 animate-spin text-primary" />
                <h1 className="text-2xl font-semibold">Verifying your email...</h1>
                <p className="text-muted-foreground">Please wait while we confirm your email address.</p>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                    <LuCheck className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                <h1 className="text-2xl font-semibold">Email Verified!</h1>
                <p className="text-muted-foreground">Thank you for verifying your email address. You can now access your account.</p>
                <Button className="w-full mt-4" asChild>
                    <Link href="/login">
                        Go to Login <LuArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                 <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                    <LuMail className="h-8 w-8 text-red-600 dark:text-red-500" />
                </div>
                <h1 className="text-2xl font-semibold">Verification Failed</h1>
                <p className="text-muted-foreground max-w-sm">
                    The verification link may be invalid or expired. Please request a new one or contact support.
                </p>
                <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/login">Back to Login</Link>
                </Button>
            </div>
        )
    }

    // Default 'idle' state: Instructions to check email
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
             <div className="rounded-full bg-primary/10 p-3">
                <LuMail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold">Check your email</h1>
            <div className="text-muted-foreground max-w-sm">
                <p>We've sent a verification link to:</p>
                {email && <p className="font-medium text-foreground my-2">{email}</p>}
                <p className="text-sm mt-2">Click the link in the email to verify your account.</p>
            </div>
            
            <div className="flex flex-col gap-3 w-full mt-6">
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Return to Login</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                    Didn't receive the email? <button className="text-primary hover:underline">Resend</button>
                </p>
            </div>
        </div>
    )
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-8"><LuLoader className="animate-spin h-8 w-8" /></div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
