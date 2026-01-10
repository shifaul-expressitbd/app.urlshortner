"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    LuChartBar, 
    LuGlobe, 
    LuShieldCheck, 
    LuZap, 
    LuLink, 
    LuQrCode,
    LuArrowRight,
    LuCheck
} from "react-icons/lu"
import Link from "next/link"

const features = [
    {
        title: "Advanced Analytics",
        description: "Track every click with real-time data on location, device, and browser. Understand your audience better.",
        icon: LuChartBar,
    },
    {
        title: "Custom Aliases",
        description: "Ditch the random characters. Create meaningful, branded links like yoursite.com/summer-sale.",
        icon: LuGlobe,
    },
    {
        title: "Link Management",
        description: "Organize your links with tags and folders. Filter, search, and manage bulk links with ease.",
        icon: LuLink,
    },
    {
        title: "Security & Control",
        description: "Password protect sensitive links, set expiration dates, and disable links instantly.",
        icon: LuShieldCheck,
    },
    {
        title: "QR Code Generation",
        description: "Automatically generate high-res QR codes for every link. Perfect for print marketing and events.",
        icon: LuQrCode,
    },
    {
        title: "Developer API",
        description: "Automate short link creation from your own apps using our robust and documented REST API.",
        icon: LuZap,
    },
]

export default function FeaturesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative px-6 py-24 sm:py-32 lg:px-8 bg-background overflow-hidden">
                <div className="mx-auto max-w-2xl text-center">
                    <Badge className="mb-4" variant="secondary">Core Capabilities</Badge>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Everything you need to control your links
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground mb-10">
                        Stop sharing long, ugly URLs. Get total control over your shared links with powerful analytics, customization, and security tools.
                    </p>
                    <div className="flex items-center justify-center gap-x-6">
                        <Button size="lg" asChild>
                            <Link href="/register">Get Started for Free <LuArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 sm:py-32 bg-muted/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            More than just a link shortener
                        </p>
                    </div>
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {features.map((feature) => (
                                <Card key={feature.title} className="bg-background border-muted hover:shadow-lg transition-all duration-200">
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive: Analytics */}
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
                        <div>
                             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                                Data-Driven Decisions
                             </h2>
                             <p className="text-lg text-muted-foreground mb-8">
                                Stop guessing. See exactly how your links are performing with our detailed analytics dashboard.
                             </p>
                             <ul className="space-y-4">
                                {[
                                    "Click-through rates over time",
                                    "Geographic location of visitors",
                                    "Device and browser breakdown",
                                    "Referrer tracking"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <LuCheck className="h-5 w-5 text-green-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                        <div className="relative rounded-xl bg-muted/50 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                             <div className="rounded-md bg-background shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 p-8 flex items-center justify-center min-h-[300px]">
                                {/* Placeholder for Analytics Visual */}
                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="flex h-32 w-full items-end gap-2">
                                            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                                <div key={i} className="w-8 bg-primary/80 rounded-t" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">Weekly Traffic Overview</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-24 sm:py-32 lg:px-8 bg-primary/5">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to enhance your links?</h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Join thousands of users who trust us to manage their URL shortening needs.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" asChild>
                            <Link href="/register">Get Started</Link>
                        </Button>
                        <Button variant="link" asChild>
                            <Link href="/contact">Contact Sales <LuArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
