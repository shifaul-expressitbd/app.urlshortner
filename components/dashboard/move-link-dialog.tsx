"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { Link } from "./types";
import { LuFolder, LuLoader } from "react-icons/lu";

interface MoveLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: Link | null;
  onSuccess?: () => void;
}

export function MoveLinkDialog({
  open,
  onOpenChange,
  link,
  onSuccess,
}: MoveLinkDialogProps) {
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("none");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      fetchFolders();
      // Initialize with current folder
      setSelectedFolderId(link?.folder?.id || "none");
    }
  }, [open, link]);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const res = await api.get<any[]>("/folders?limit=100");
      setFolders(Array.isArray(res) ? res : (res as any).items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load folders");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!link) return;

    try {
      setSaving(true);
      await api.patch(`/urls/${link.id}`, {
        folderId: selectedFolderId === "none" ? null : selectedFolderId,
      });

      toast.success("Link moved successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "Failed to move link");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move Link</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Select Destination</Label>
            <Select
              value={selectedFolderId}
              onValueChange={setSelectedFolderId}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loading ? "Loading folders..." : "Select a folder"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  <>
                    <SelectItem value="none">
                      <span className="flex items-center text-muted-foreground">
                        <LuFolder className="mr-2 h-4 w-4" />
                        No Folder (Global)
                      </span>
                    </SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        <span className="flex items-center">
                          <LuFolder className="mr-2 h-4 w-4 text-primary" />
                          {folder.name}
                        </span>
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || loading}>
            {saving && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
            Move Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
