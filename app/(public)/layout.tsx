import { Footer } from "@/components/landing/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center" href="/">
              <span className="font-bold sm:inline-block">UrlShortener</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2 md:space-x-6 text-sm font-medium">
              <a
                href="/features"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </a>
              <a
                href="/login"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Login
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
