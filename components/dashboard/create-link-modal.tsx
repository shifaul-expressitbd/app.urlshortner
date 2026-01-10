"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import {
  LuLoader,
  LuPlus,
  LuCalendar,
  LuSettings,
  LuGlobe,
} from "react-icons/lu";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CreateLinkModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

interface Domain {
  id: string;
  domain: string;
  verificationStatus: string;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export function CreateLinkModal({ onSuccess, trigger }: CreateLinkModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useCustomAlias, setUseCustomAlias] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(undefined);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for folders and domains
  const [folders, setFolders] = useState<any[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(
    undefined,
  );
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>(
    undefined,
  );
  const [hasMaxClicks, setHasMaxClicks] = useState(false);

  // Fetch folders and domains when modal opens
  useEffect(() => {
    if (open) {
      if (folders.length === 0) {
        api
          .get<any[]>("/folders?limit=100")
          .then((res) =>
            setFolders(Array.isArray(res) ? res : (res as any).items || []),
          )
          .catch(console.error);
      }
      if (domains.length === 0) {
        api
          .get<Domain[]>("/domains")
          .then((res) => {
            const activeDomains = (Array.isArray(res) ? res : []).filter(
              (d) => d.verificationStatus === "VERIFIED",
            );
            setDomains(activeDomains);
          })
          .catch(console.error);
      }
    }
  }, [open, folders.length, domains.length]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const originalUrl = formData.get("originalUrl") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const alias = formData.get("customAlias") as string;
    const password = formData.get("password") as string;
    const maxClicks = formData.get("maxClicks") as string;

    try {
      await api.post("/urls", {
        originalUrl,
        title: title || undefined,
        description: description || undefined,
        customAlias: useCustomAlias && alias ? alias : undefined,
        password: isPasswordProtected && password ? password : undefined,
        expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
        folderId: selectedFolder === "none" ? undefined : selectedFolder,
        domainId: selectedDomain === "none" ? undefined : selectedDomain,
        maxClicks: hasMaxClicks && maxClicks ? parseInt(maxClicks) : undefined,
      });

      toast.success("Link created successfully");
      setOpen(false);
      onSuccess?.();

      // Reset form state
      setUseCustomAlias(false);
      setIsPasswordProtected(false);
      setExpiresAt(undefined);
      setSelectedFolder(undefined);
      setSelectedDomain(undefined);
      setHasMaxClicks(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  }

  // Get the prefix based on selected domain
  const getShortUrlPrefix = () => {
    if (selectedDomain && selectedDomain !== "none") {
      const domain = domains.find((d) => d.id === selectedDomain);
      return domain ? `${domain.domain}/` : "shifaul.dev/s/";
    }
    return "shifaul.dev/s/";
  };

  const formContent = (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Core URL Input */}
      <div className="grid gap-2">
        <Label htmlFor="originalUrl">Destination URL</Label>
        <Input
          id="originalUrl"
          name="originalUrl"
          placeholder="https://very-long-url.com/awesome-content"
          required
          type="url"
        />
      </div>

      {/* Basic Info */}
      <div className="grid gap-2">
        <Label htmlFor="title">Title (Optional)</Label>
        <Input id="title" name="title" placeholder="My Awesome Link" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Internal notes or public description"
          className="resize-none h-20"
        />
      </div>

      {/* Organization */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Folder</Label>
          <Select
            value={selectedFolder || "none"}
            onValueChange={setSelectedFolder}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a folder">
                {selectedFolder === "none"
                  ? "No Folder"
                  : folders.find((f) => f.id === selectedFolder)?.name}
              </SelectValue>
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
        </div>

        {/* Custom Domain Selector */}
        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            <LuGlobe className="w-3 h-3" /> Domain
          </Label>
          <Select
            value={selectedDomain || "none"}
            onValueChange={setSelectedDomain}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select domain">
                {selectedDomain === "none"
                  ? "Default (shifaul.dev)"
                  : domains.find((d) => d.id === selectedDomain)?.domain}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default (shifaul.dev)</SelectItem>
              {domains.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
          <LuSettings className="w-4 h-4" /> Advanced Options
        </h4>

        {/* Custom Alias */}
        <div className="space-y-3 pl-1">
          <div className="flex items-center space-x-2">
            <Switch
              id="custom-alias-mode"
              checked={useCustomAlias}
              onCheckedChange={setUseCustomAlias}
            />
            <Label htmlFor="custom-alias-mode">Use Custom Alias</Label>
          </div>

          {useCustomAlias && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 text-sm border border-r-0 rounded-l-md text-muted-foreground min-w-fit">
                  {getShortUrlPrefix()}
                </span>
                <Input
                  id="customAlias"
                  name="customAlias"
                  placeholder="my-link"
                  className="rounded-l-none"
                  pattern="[a-zA-Z0-9-_]+"
                  title="Only letters, numbers, hyphens and underscores allowed"
                  required={useCustomAlias}
                />
              </div>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="space-y-3 pl-1 mt-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="password-mode"
              checked={isPasswordProtected}
              onCheckedChange={setIsPasswordProtected}
            />
            <Label htmlFor="password-mode">Password Protection</Label>
          </div>

          {isPasswordProtected && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Secret123!"
                required={isPasswordProtected}
              />
            </div>
          )}
        </div>

        {/* Expiration */}
        <div className="space-y-3 pl-1 mt-4">
          <div className="grid gap-2">
            <Label className="text-sm font-normal">Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expiresAt && "text-muted-foreground",
                  )}
                >
                  <LuCalendar className="mr-2 h-4 w-4" />
                  {expiresAt ? format(expiresAt, "PPP") : "Never"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiresAt}
                  onSelect={(date) => setExpiresAt(date as Date | undefined)}
                  minDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Max Clicks */}
        <div className="space-y-3 pl-1 mt-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="max-clicks-mode"
              checked={hasMaxClicks}
              onCheckedChange={setHasMaxClicks}
            />
            <Label htmlFor="max-clicks-mode">Limit total clicks</Label>
          </div>

          {hasMaxClicks && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Input
                id="maxClicks"
                name="maxClicks"
                type="number"
                min="1"
                placeholder="e.g. 100"
                required={hasMaxClicks}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4 justify-end">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
          Create Link
        </Button>
      </div>
    </form>
  );

  const triggerButton = trigger ? (
    trigger
  ) : (
    <Button>
      <LuPlus className="mr-2 h-4 w-4" />
      Create Link
    </Button>
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{triggerButton}</SheetTrigger>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Short Link</SheetTitle>
            <SheetDescription>
              Paste your long URL below. We'll generate a short, trackable link
              for you.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">{formContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Create Short Link</DrawerTitle>
          <DrawerDescription>
            Paste your long URL below. We'll generate a short, trackable link
            for you.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
