import { AnalyticsPreview } from "@/components/landing/analytics-preview";
import { PublicShortener } from "@/components/landing/public-shortener";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LuActivity,
  LuArrowRight,
  LuCheck,
  LuLink,
  LuShield,
  LuZap,
} from "react-icons/lu";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-3 lg:px-8 py-12 lg:py-24 overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-6 py-1.5 px-4 text-sm border-primary/20 bg-primary/5 text-primary"
            >
              ✨ Version 1.0 is now live
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-black dark:from-white dark:to-gray-400">
              Shorten links.
              <br />
              <span className="text-primary">Expand your reach.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              A powerful URL shortener built for modern marketing teams. Track
              clicks, analyze audiences, and manage your brand with custom
              domains.
            </p>
            <div className="mt-8">
              <PublicShortener />
            </div>
            {/*
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div> */}
          </div>

          {/* Hero Visual */}
          <div className="mt-16 flow-root sm:mt-24">
            {/* <div className="relative rounded-xl border bg-muted/50 p-2 lg:-m-4 lg:rounded-2xl lg:p-4 ring-1 ring-inset ring-foreground/10">
                <div className="rounded-lg border shadow-2xl overflow-hidden bg-background"> */}
            <AnalyticsPreview />
            {/* </div>
            </div> */}
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/30 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
              { id: 1, name: "Active Links", value: "1M+" },
              { id: 2, name: "Clicks Tracked", value: "500M+" },
              { id: 3, name: "Happy Users", value: "50k+" },
            ].map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-muted-foreground">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful features for power users
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Stop using basic link shorteners. Upgrade to a platform that gives
              you control, visibility, and security.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "Advanced Analytics",
                  description:
                    "Track clicks by location, device, and browser. Export data for deeper analysis.",
                  icon: LuActivity,
                },
                {
                  name: "Custom Domains",
                  description:
                    "Connect your own domain name to build trust and brand recognition.",
                  icon: LuLink,
                },
                {
                  name: "Enterprise Security",
                  description:
                    "SSO, detailed audit logs, and role-based access control for your team.",
                  icon: LuShield,
                },
                {
                  name: "Lightning Fast",
                  description:
                    "Optimized redirect performance ensuring your users never wait.",
                  icon: LuZap,
                },
                {
                  name: "QR Codes",
                  description:
                    "Generate QR codes automatically for every link you create.",
                  icon: LuCheck, // Using generic icon for QR
                },
                {
                  name: "Team Collaboration",
                  description:
                    "Invite your team and manage links together in shared workspaces.",
                  icon: LuCheck, // Using generic icon
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <feature.icon
                      className="h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative  px-6 py-24 sm:py-32 lg:px-8 text-black dark:bg-primary/5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl ">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300 dark:text-muted-foreground">
            Join thousands of marketers and developers who use our platform to
            manage their links.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-2 md:gap-x-6">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button
              size="default"
              variant="link"
              className="text-white dark:text-primary"
              asChild
            >
              <Link href="/contact">
                Contact Sales <LuArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
