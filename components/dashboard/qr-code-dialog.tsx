"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LuDownload, LuCopy } from "react-icons/lu"
import { toast } from "sonner"
import Image from "next/image"

interface QrCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  link: {
    shortUrl: string
    qrCodeUrl?: string
    title?: string
    shortCode: string
  } | null
}

export function QrCodeDialog({ open, onOpenChange, link }: QrCodeDialogProps) {
  if (!link) return null

  const handleDownload = () => {
    if (!link.qrCodeUrl) return
    const linkElement = document.createElement("a")
    linkElement.href = link.qrCodeUrl
    linkElement.download = `qrcode-${link.shortCode}.png`
    document.body.appendChild(linkElement)
    linkElement.click()
    document.body.removeChild(linkElement)
    toast.success("QR Code downloaded")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.shortUrl)
    toast.success("Link copied to clipboard")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan to visit <span className="font-medium text-foreground">{link.shortUrl}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
                {link.qrCodeUrl ? (
                     <img 
                        src={link.qrCodeUrl} 
                        alt={`QR Code for ${link.shortUrl}`}
                        className="w-48 h-48 object-contain"
                    />
                ) : (
                    <div className="w-48 h-48 bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm">
                        No QR Code
                    </div>
                )}
            </div>
            <div className="flex gap-2 w-full">
                <Button className="flex-1" variant="outline" onClick={handleDownload} disabled={!link.qrCodeUrl}>
                    <LuDownload className="w-4 h-4 mr-2" />
                    Download PNG
                </Button>
                <Button className="flex-1" onClick={handleCopyLink}>
                    <LuCopy className="w-4 h-4 mr-2" />
                    Copy Link
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
