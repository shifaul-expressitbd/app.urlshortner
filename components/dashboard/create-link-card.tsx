"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import {
  LuLoader,
  LuCopy,
  LuArrowRight,
  LuCheck,
  LuPlus,
  LuFolder,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateLinkModal } from "./create-link-modal";
import { LuSettings2 } from "react-icons/lu";

interface CreateLinkCardProps {
  onLinkCreated?: () => void;
  className?: string;
  folderId?: string;
}

export function CreateLinkCard({
  onLinkCreated,
  className,
  folderId,
}: CreateLinkCardProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Folder State
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    folderId,
  );
  const [showFolderSelect, setShowFolderSelect] = useState(false);

  // Fetch folders if not provided
  // Fetch folders if not provided
  const fetchFolders = async () => {
    if (folderId) return; // Don't fetch if folderId is fixed
    try {
      // Basic fetch, assumes low count. For safer scale, pagination might be needed.
      const res = await api.get<any[]>("/folders?limit=100");
      setFolders(Array.isArray(res) ? res : (res as any).items || []);
      setShowFolderSelect(true);
    } catch (e) {
      console.error("Failed to fetch folders", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;

    // Simple validation
    try {
      const urlToCheck = originalUrl.startsWith("http")
        ? originalUrl
        : `https://${originalUrl}`;
      new URL(urlToCheck);
      if (!originalUrl.startsWith("http")) {
        setOriginalUrl(urlToCheck);
      }
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setShortUrl("");

    try {
      const res = await api.post<{ shortUrl: string }>("/urls", {
        originalUrl: originalUrl.startsWith("http")
          ? originalUrl
          : `https://${originalUrl}`,
        folderId: folderId || selectedFolderId,
      });

      setShortUrl(res.shortUrl);
      toast.success("Link shortened successfully!");
      if (onLinkCreated) onLinkCreated();
    } catch (error: any) {
      toast.error(error.message || "Failed to shorten link");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setShortUrl("");
    setOriginalUrl("");
  };

  return (
    <Card
      className={cn(
        "border-dashed border-2 shadow-none hover:border-solid transition-all",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuPlus className="h-4 w-4" />
            Quick Shorten
            {folderId && (
              <span className="text-xs font-normal text-muted-foreground">
                (in current folder)
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!shortUrl ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="Paste long URL to shorten..."
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !originalUrl}>
                {loading ? (
                  <LuLoader className="h-4 w-4 animate-spin" />
                ) : (
                  "Shorten"
                )}
              </Button>
              <CreateLinkModal
                onSuccess={onLinkCreated}
                trigger={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Advanced Options"
                  >
                    <LuSettings2 className="h-4 w-4" />
                  </Button>
                }
              />
            </div>

            {!folderId && (
              <div className="flex items-center gap-2">
                {!showFolderSelect ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-foreground"
                    onClick={fetchFolders}
                  >
                    <LuFolder className="mr-1 h-3 w-3" />
                    Add to folder
                  </Button>
                ) : (
                  <Select
                    value={selectedFolderId || "none"}
                    onValueChange={(val) =>
                      setSelectedFolderId(val === "none" ? undefined : val)
                    }
                  >
                    <SelectTrigger className="h-8 w-[140px] text-xs">
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Folder</SelectItem>
                      {folders.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </form>
        ) : (
          <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-md border">
            <div className="flex-1 px-3 text-sm font-medium truncate text-primary">
              {shortUrl}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <LuCheck className="h-4 w-4 text-green-500" />
              ) : (
                <LuCopy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="h-8 px-2 text-xs"
            >
              New
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
