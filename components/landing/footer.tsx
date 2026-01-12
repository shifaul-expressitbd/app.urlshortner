import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";

export function Footer() {
  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/cutzy logo.png"
                alt="cutzy Logo"
                quality={100}
                priority={true}
                width={100}
                height={32}
              />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Empowering developers and marketers with powerful link management
              tools. Simple, fast, and secure.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <LuGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <LuTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <LuLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Product
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/features"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Resources
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-zinc-900/10 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <div className="mt-6 mb-5 text-center">
              <p className="text-primary text-sm">
                <span className="font-airstrip ml-1.5 text-primary hover:text-blue-900">
                  Express
                  <span className="relative font-sans text-base md:text-lg text-white font-bold bg-secondary px-1 mr-1">
                    IT
                    <span className="absolute border-l-[5px] border-l-transparent border-r-transparent border-t-[5px] border-t-pink-700 right-0 top-full"></span>
                  </span>
                  bd
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
