"use client";

import { useState } from "react";
import { Link } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LuCopy,
  LuExternalLink,
  LuQrCode,
  LuChartBar,
  LuPencil,
  LuTrash2,
  LuEllipsis,
  LuCalendar,
  LuMousePointer2,
  LuFolder,
} from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { QrCodeDialog } from "./qr-code-dialog";

import { MoveLinkDialog } from "./move-link-dialog";

interface LinkCardProps {
  link: Link;
  onRefresh?: () => void;
}

export function LinkCard({ link, onRefresh }: LinkCardProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Card className="hover:border-primary/50 transition-colors overflow-hidden">
        <div className="flex bg-card">
          {/* Main Content (Left) */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg truncate leading-none">
                        {link.title || `/${link.shortCode}`}
                      </h3>
                      {link.folder && (
                        <div
                          className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground shrink-0"
                          style={{
                            backgroundColor: link.folder.color
                              ? `${link.folder.color}20`
                              : undefined,
                            color: link.folder.color,
                          }}
                        >
                          <LuFolder className="h-3 w-3" />
                          <span className="truncate max-w-[80px]">
                            {link.folder.name}
                          </span>
                        </div>
                      )}
                    </div>
                    {link.title && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        /{link.shortCode}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <LuCalendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(link.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-primary hover:underline block truncate"
                  >
                    {link.shortUrl}
                  </a>
                  <div
                    className="text-xs text-muted-foreground truncate"
                    title={link.originalUrl}
                  >
                    {link.originalUrl}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LuEllipsis className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setQrOpen(true)}>
                      <LuQrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => copyToClipboard(link.shortUrl)}
                    >
                      <LuCopy className="mr-2 h-4 w-4" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={`/links/${link.id}/analytics`}>
                        <LuChartBar className="mr-2 h-4 w-4" />
                        Analytics
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMoveOpen(true)}>
                      <LuFolder className="mr-2 h-4 w-4" />
                      Move to Folder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setDeleteOpen(true)}
                    >
                      <LuTrash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(link.shortUrl)}
                >
                  <LuCopy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setQrOpen(true)}
                >
                  <LuQrCode className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <a href={`/links/${link.id}/analytics`}>
                    <LuChartBar className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setMoveOpen(true)}
                >
                  <LuFolder className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <LuMousePointer2 className="h-4 w-4 text-muted-foreground" />
                {link.totalClicks}
              </div>
            </div>
          </div>
          {/* QR Code (Right) */}
          {link.qrCodeUrl && (
            <div
              className="w-48 bg-white flex items-center justify-center p-2 cursor-pointer hover:bg-gray-50 transition-colors border-l"
              onClick={() => setQrOpen(true)}
            >
              <img
                src={link.qrCodeUrl}
                alt="QR Code"
                className="w-full h-full object-contain aspect-square"
              />
            </div>
          )}
        </div>
      </Card>

      <QrCodeDialog open={qrOpen} onOpenChange={setQrOpen} link={link} />

      <MoveLinkDialog
        open={moveOpen}
        onOpenChange={setMoveOpen}
        link={link}
        onSuccess={onRefresh}
      />

      <DeleteLinkDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        linkId={link.id}
        onSuccess={onRefresh}
      />
    </>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/lib/api-client";
import { LuLoader } from "react-icons/lu";

function DeleteLinkDialog({
  open,
  onOpenChange,
  linkId,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkId: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);
      await api.delete(`/urls/${linkId}`);
      toast.success("Link deleted successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to delete link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            shortened link and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
