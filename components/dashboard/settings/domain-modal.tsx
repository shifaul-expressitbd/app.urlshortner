"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { LuLoader, LuPlus } from "react-icons/lu";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DomainModalProps {
  onDomainAdded: () => void;
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

export function DomainModal({ onDomainAdded }: DomainModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    try {
      setLoading(true);
      await api.post("/domains", { domain });
      toast.success("Domain added successfully");
      setOpen(false);
      setDomain("");
      onDomainAdded();
    } catch (error: any) {
      toast.error(error.message || "Failed to add domain");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          placeholder="links.example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading || !domain}>
        {loading && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
        Add Domain
      </Button>
    </form>
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>
            <LuPlus className="mr-2 h-4 w-4" />
            Add Domain
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Custom Domain</SheetTitle>
            <SheetDescription>
              Enter the domain you want to connect. You will need to configure
              DNS records.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">{formContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <LuPlus className="mr-2 h-4 w-4" />
          Add Domain
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Custom Domain</DrawerTitle>
          <DrawerDescription>
            Enter the domain you want to connect. You will need to configure DNS
            records.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
