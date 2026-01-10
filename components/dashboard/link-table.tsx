"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  LuEllipsis,
  LuCopy,
  LuPencil,
  LuTrash2,
  LuExternalLink,
  LuQrCode,
  LuChartBar,
} from "react-icons/lu";
import { toast } from "sonner";
import { Link } from "./types";
import { QrCodeDialog } from "./qr-code-dialog";

interface LinkTableProps {
  links: Link[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export function LinkTable({ links, isLoading, onRefresh }: LinkTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading links...
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 border-dashed">
        <div className="p-4 bg-muted rounded-full mb-4">
          <LuCopy className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No links created yet</h3>
        <p className="text-muted-foreground mb-4 text-center max-w-sm">
          Create your first shortened URL to start tracking clicks and
          engagement.
        </p>
      </div>
    );
  }

  const [qrLink, setQrLink] = React.useState<Link | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Short Link</TableHead>
              <TableHead className="w-[200px]">Original Link</TableHead>
              <TableHead className="w-[100px]">Clicks</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 font-medium">
                      <span className="truncate max-w-[200px] text-primary">
                        {link.customAlias || link.shortCode}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(link.shortUrl)}
                      >
                        <LuCopy className="h-3 w-3" />
                      </Button>
                    </div>
                    {link.title && (
                      <span className="text-xs text-muted-foreground truncate max-w-[250px]">
                        {link.title}
                      </span>
                    )}
                    {link.folder && (
                      <div className="flex items-center gap-1 mt-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1 py-0 h-4 font-normal"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mr-1"
                            style={{
                              backgroundColor: link.folder.color || "#888",
                            }}
                          />
                          {link.folder.name}
                        </Badge>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${link.originalUrl}&sz=32`}
                      alt="Favicon"
                      className="w-4 h-4 rounded-sm opacity-70"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate max-w-[150px] text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors"
                      title={link.originalUrl}
                    >
                      {link.originalUrl.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {link.totalClicks} clicks
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={link.isActive ? "default" : "destructive"}
                    className={
                      link.isActive
                        ? "bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:text-green-400"
                        : ""
                    }
                  >
                    {link.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(link.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <LuEllipsis className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => copyToClipboard(link.shortUrl)}
                      >
                        <LuCopy className="mr-2 h-4 w-4" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setQrLink(link)}>
                        <LuQrCode className="mr-2 h-4 w-4" />
                        QR Code
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={link.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LuExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={`/links/${link.id}/analytics`}>
                          <LuChartBar className="mr-2 h-4 w-4" />
                          Analytics
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LuPencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <LuTrash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <QrCodeDialog
        open={!!qrLink}
        onOpenChange={(open) => !open && setQrLink(null)}
        link={qrLink}
      />
    </>
  );
}
