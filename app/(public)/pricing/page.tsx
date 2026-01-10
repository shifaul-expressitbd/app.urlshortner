"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LuCheck, LuX } from "react-icons/lu"
import Link from "next/link"

export default function PricingPage() {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                        Simple plans for everyone
                    </p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Whether you're just starting out or scaling a brand, we have a plan that fits.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 gap-x-8">
                    {/* Free Plan */}
                    <div className="rounded-3xl p-8 ring-1 ring-border bg-background/50 hover:bg-background transition-colors xl:p-10 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold leading-8">Starter</h3>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">Perfect for personal use and side projects.</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight">$0</span>
                                <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> 50 Links / month</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Basic Analytics</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> 1 User</li>
                                <li className="flex gap-x-3 text-muted-foreground/50"><LuX className="h-6 w-5 flex-none" /> Custom Aliases</li>
                            </ul>
                        </div>
                        <Button variant="outline" className="mt-8 w-full" asChild>
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative rounded-3xl p-8 ring-2 ring-primary bg-primary/5 xl:p-10 flex flex-col justify-between transform lg:-translate-y-4 lg:shadow-xl">
                        <div className="absolute top-0 right-0 -mr-2 -mt-2">
                             <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs uppercase tracking-wider rounded-full">Most Popular</Badge>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold leading-8 text-primary">Pro</h3>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">For creators and growing businesses.</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight">$29</span>
                                <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Unlimited Links</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Advanced Analytics</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Custom Aliases</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> 5 Custom Domains</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Priority Support</li>
                            </ul>
                        </div>
                        <Button className="mt-8 w-full shadow-lg shadow-primary/25" size="lg" asChild>
                            <Link href="/register?plan=pro">Start Free Trial</Link>
                        </Button>
                    </div>

                    {/* Team Plan */}
                    <div className="rounded-3xl p-8 ring-1 ring-border bg-background/50 hover:bg-background transition-colors xl:p-10 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold leading-8">Enterprise</h3>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">For large teams and organizations.</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight">$99</span>
                                <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Unlimited Everything</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> SSO & SAML</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> Dedicated Success Manager</li>
                                <li className="flex gap-x-3"><LuCheck className="h-6 w-5 flex-none text-primary" /> 99.9% SLA</li>
                            </ul>
                        </div>
                        <Button variant="outline" className="mt-8 w-full" asChild>
                            <Link href="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-24 sm:mt-32">
                    <div className="mx-auto max-w-2xl lg:text-center mb-10">
                        <h2 className="text-base font-semibold leading-7 text-primary">Compare Plans</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Feature Breakdown</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-4 px-6 text-sm font-semibold text-muted-foreground">Feature</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-center">Starter</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-center text-primary">Pro</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-center">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="py-4 px-6 text-sm font-medium">Monthly Links</td>
                                    <td className="py-4 px-6 text-sm text-center">50</td>
                                    <td className="py-4 px-6 text-sm text-center font-semibold text-primary">Unlimited</td>
                                    <td className="py-4 px-6 text-sm text-center">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 text-sm font-medium">Data Retention</td>
                                    <td className="py-4 px-6 text-sm text-center">30 Days</td>
                                    <td className="py-4 px-6 text-sm text-center font-semibold text-primary">1 Year</td>
                                    <td className="py-4 px-6 text-sm text-center">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 text-sm font-medium">Custom Domains</td>
                                    <td className="py-4 px-6 text-sm text-center text-muted-foreground"><LuX className="mx-auto" /></td>
                                    <td className="py-4 px-6 text-sm text-center font-semibold text-primary">5 Domains</td>
                                    <td className="py-4 px-6 text-sm text-center">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 text-sm font-medium">API Access</td>
                                    <td className="py-4 px-6 text-sm text-center text-muted-foreground"><LuX className="mx-auto" /></td>
                                    <td className="py-4 px-6 text-sm text-center font-semibold text-primary"><LuCheck className="mx-auto" /></td>
                                    <td className="py-4 px-6 text-sm text-center"><LuCheck className="mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 sm:mt-32 max-w-3xl mx-auto">
                     <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                            <AccordionContent>
                                Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the billing period.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What happens if I exceed my link limit?</AccordionTrigger>
                            <AccordionContent>
                                We'll notify you when you're close to your limit. We won't cut off your links immediately, but you'll be asked to upgrade to continue creating new ones.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>Do you offer a free trial for Pro?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we offer a 14-day free trial for the Pro plan so you can test out all the advanced features risk-free.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>
        </div>
    )
}
