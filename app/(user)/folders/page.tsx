"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  LuFolder,
  LuPlus,
  LuEllipsisVertical,
  LuPencil,
  LuTrash2,
  LuLoader,
} from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

interface Folder {
  id: string;
  name: string;
  color: string;
  _count?: {
    urls: number;
  };
}

export default function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFolders() {
    try {
      setLoading(true);
      const res = await api.get<Folder[]>("/folders");
      setFolders(res);
    } catch (error) {
      toast.error("Failed to load folders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Folders</h2>
          <p className="text-muted-foreground">
            Organize your links into collections.
          </p>
        </div>
        <CreateFolderModal onSuccess={fetchFolders} />
      </div>

      {loading && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {!loading && folders.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 border-dashed">
          <div className="p-4 bg-muted rounded-full mb-4">
            <LuFolder className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No folders yet</h3>
          <p className="text-muted-foreground mb-4 text-center max-w-sm">
            Create a folder to organize your marketing campaigns or projects.
          </p>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className="group hover:border-primary transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: folder.color || "#888" }}
                />
                <Link
                  href={`/folders/${folder.id}`}
                  className="hover:underline"
                >
                  {folder.name}
                </Link>
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuEllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <LuPencil className="mr-2 h-4 w-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <LuTrash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Link href={`/folders/${folder.id}`} className="block">
                <div className="text-2xl font-bold">
                  {folder._count?.urls || 0}
                </div>
                <p className="text-xs text-muted-foreground">Links in folder</p>
              </Link>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full text-xs h-8" asChild>
                <Link href={`/folders/${folder.id}`}>View Links</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CreateFolderModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    try {
      await api.post("/folders", { name, color });
      toast.success("Folder created");
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to create folder");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Name your folder to organize your links.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Summer Campaign"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  className="w-12 p-1"
                  defaultValue="#3b82f6"
                />
                <Input
                  disabled
                  value="Pick a color"
                  className="flex-1 opacity-50"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
