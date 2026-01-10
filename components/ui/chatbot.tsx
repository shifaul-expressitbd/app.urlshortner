"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { ScrollArea } from "@/components/ui/scroll-area"

const Chatbot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col w-full h-[500px] border rounded-lg bg-background text-foreground shadow-sm overflow-hidden",
            className
        )}
        {...props}
    />
))
Chatbot.displayName = "Chatbot"

const ChatbotHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center px-4 py-3 border-b bg-muted/40",
            className
        )}
        {...props}
    />
))
ChatbotHeader.displayName = "ChatbotHeader"

const ChatbotContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <ScrollArea
        ref={ref}
        className={cn("flex-1 p-2 space-y-4 flex flex-col", className)}
        scrollbarSize="thin"
        {...props}
    />
))
ChatbotContent.displayName = "ChatbotContent"

const chatbotMessageVariants = cva(
    "max-w-[80%] rounded-2xl px-4 py-2 text-sm break-words",
    {
        variants: {
            variant: {
                user: "bg-primary text-primary-foreground rounded-br-none ml-auto",
                bot: "bg-muted text-foreground rounded-bl-none mr-auto",
            },
        },
        defaultVariants: {
            variant: "bot",
        },
    }
)

const ChatbotMessage = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof chatbotMessageVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(chatbotMessageVariants({ variant }), className)}
        {...props}
    />
))
ChatbotMessage.displayName = "ChatbotMessage"

const ChatbotFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-3 border-t bg-background rounded-b-lg", className)}
        {...props}
    />
))
ChatbotFooter.displayName = "ChatbotFooter"

export {
    Chatbot,
    ChatbotHeader,
    ChatbotContent,
    ChatbotMessage,
    ChatbotFooter,
}

