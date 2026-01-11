"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LuCopy, LuDownload } from "react-icons/lu";
import { toast } from "sonner";

interface QrCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: {
    shortUrl: string;
    qrCodeUrl?: string;
    title?: string;
    shortCode: string;
  } | null;
}

export function QrCodeDialog({ open, onOpenChange, link }: QrCodeDialogProps) {
  if (!link) return null;

  const handleDownload = () => {
    if (!link.qrCodeUrl) return;
    const linkElement = document.createElement("a");
    linkElement.href = link.qrCodeUrl;
    linkElement.download = `qrcode-${link.shortCode}.png`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    toast.success("QR Code downloaded");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.shortUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ✅ Change 1: Max-width adjustment.
        Use "max-w-xs md:max-w-md" or similar for tighter control.
        A common pattern is "w-[95%] max-w-sm md:max-w-md" to ensure it fills most of the screen on mobile.
        I will use "max-w-xs sm:max-w-md" to make it a bit wider on extra-small screens.
      */}
      <DialogContent className="sm:max-w-md max-w-[90%]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan to visit{" "}
            <span className="font-medium text-foreground">{link.shortUrl}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          {" "}
          {/* Adjusted padding slightly */}
          {/* ✅ Change 2: Ensure QR code container scales. */}
          <div className="bg-white p-4 rounded-lg border shadow-sm max-w-full">
            {link.qrCodeUrl ? (
              <img
                src={link.qrCodeUrl}
                alt={`QR Code for ${link.shortUrl}`}
                /* The fixed w-48/h-48 is generally fine for a QR code but
                    I've kept it as it is an ideal size. The outer div's
                    max-width will prevent overflow.
                  */
                className="w-48 h-48 object-contain mx-auto"
              />
            ) : (
              <div className="w-48 h-48 bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm mx-auto">
                No QR Code
              </div>
            )}
          </div>
          {/* ✅ Change 3: Button responsiveness.
            Use "flex-col sm:flex-row" to stack on small screens and go side-by-side on 'sm' and up.
          */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              className="w-full sm:flex-1"
              variant="outline"
              onClick={handleDownload}
              disabled={!link.qrCodeUrl}
            >
              <LuDownload className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
            <Button className="w-full sm:flex-1" onClick={handleCopyLink}>
              <LuCopy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
