"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuExternalLink, LuMousePointer2 } from "react-icons/lu";
import Link from "next/link";

interface TopLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  title?: string | null;
  clicks: number;
  createdAt: string;
}

interface TopLinksTableProps {
  links: TopLink[];
}

import { toast } from "sonner";
import { LuCopy } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export function TopLinksTable({ links }: TopLinksTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (!links || links.length === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top Performing Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No links found yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxClicks = Math.max(...links.map((l) => l.clicks));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Top Performing Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="flex items-center gap-4 group">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate text-sm">
                    {link.title || link.shortCode}
                  </span>
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Open original URL"
                  >
                    <LuExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/${link.shortCode}`,
                      )
                    }
                    className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy short link"
                  >
                    <LuCopy className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden max-w-[150px] sm:max-w-[200px]">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(link.clicks / maxClicks) * 100}%` }}
                    />
                  </div>
                  <span className="shrink-0 tabular-nums">
                    {link.clicks} clicks
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="shrink-0 text-xs hidden sm:inline-flex"
              >
                <Link href={`/links/${link.id}/analytics`}>View Details</Link>
              </Button>
              {/* Mobile only icon link */}
              <Link
                href={`/links/${link.id}/analytics`}
                className="sm:hidden p-2 text-muted-foreground hover:text-primary"
              >
                <LuMousePointer2 className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
