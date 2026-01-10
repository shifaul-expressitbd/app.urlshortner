"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { LuExternalLink, LuCopy, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  userId?: string;
}

export default function AdminLinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setIsLoading(true);
        // Fetch all links - admin should see all links
        const res = await api.get<{ items: Link[] }>("/urls");
        if (res.items && Array.isArray(res.items)) {
          setLinks(res.items);
        } else if (Array.isArray(res)) {
          setLinks(res as Link[]);
        } else {
          setLinks([]);
        }
      } catch (error) {
        toast.error("Failed to load public links");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/s/${code}`);
    toast.success("Short URL copied to clipboard!");
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/urls/${id}`);
      setLinks(links.filter((link) => link.id !== id));
      toast.success("Link deleted successfully");
    } catch (error) {
      toast.error("Failed to delete link");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">All Links</h2>
          <p className="text-muted-foreground">
            Manage all shortened links in the system.
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Code</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading links...
                </TableCell>
              </TableRow>
            ) : links.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No public links found.
                </TableCell>
              </TableRow>
            ) : (
              links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-mono font-medium">
                    {link.shortCode}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:underline"
                    >
                      {link.originalUrl}
                      <LuExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{link.clicks}</TableCell>
                  <TableCell>
                    <Badge variant={link.isActive ? "default" : "secondary"}>
                      {link.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(link.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(link.shortCode)}
                        title="Copy short URL"
                      >
                        <LuCopy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete link"
                      >
                        <LuTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
