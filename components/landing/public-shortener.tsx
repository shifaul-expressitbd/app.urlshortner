"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputAddon, InputGroup } from "@/components/ui/input-group";
import { FormField } from "@/components/ui/form-field";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import {
  LuLoader,
  LuCopy,
  LuArrowRight,
  LuCheck,
  LuChartBar,
  LuLink,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

export function PublicShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!originalUrl) return;

    // Simple validation
    try {
      new URL(originalUrl);
    } catch {
      if (!originalUrl.startsWith("http")) {
        // Try pre-pending https://
        try {
          new URL(`https://${originalUrl}`);
          setOriginalUrl(`https://${originalUrl}`);
        } catch {
          setError("Please enter a valid URL");
          toast.error("Please enter a valid URL");
          return;
        }
      } else {
        setError("Please enter a valid URL");
        toast.error("Please enter a valid URL");
        return;
      }
    }

    setLoading(true);
    setShortUrl("");

    try {
      // Calculate 30 days expiry
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const res = await api.post<{ shortUrl: string; shortCode: string }>(
        "/urls",
        {
          originalUrl,
          expiresAt: expiresAt.toISOString(),
        },
      );

      setShortUrl(res.shortUrl);
      setShortCode(res.shortCode);
      toast.success("Link shortened successfully!");
    } catch (error: any) {
      setError(error.message || "Failed to shorten link");
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

  return (
    <div className="w-full container mx-auto mt-8 relative z-20">
      <div>
        {!shortUrl ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField error={error} className="w-full">
              <InputGroup className="h-14">
                <InputAddon className="h-14 w-14 text-muted-foreground">
                  <LuLink className="h-5 w-5" />
                </InputAddon>
                <Input
                  placeholder="Paste your long link here..."
                  className="h-14 text-lg border-l-0 rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                  value={originalUrl}
                  onChange={(e) => {
                    setOriginalUrl(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 text-base shadow-sm shrink-0 rounded-l-none"
                  disabled={loading || !originalUrl}
                >
                  {loading ? (
                    <LuLoader className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Shorten <LuArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </InputGroup>
            </FormField>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-muted/30 rounded-lg border text-left truncate font-medium text-xl text-primary flex items-center gap-3">
              <LuCheck className="h-5 w-5 text-green-500 shrink-0" />
              {shortUrl}
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-6 flex-1 sm:flex-none"
                onClick={() => {
                  setShortUrl("");
                  setOriginalUrl("");
                  setShortCode("");
                }}
              >
                Shorten another
              </Button>
              <Button
                size="lg"
                className="h-14 px-8 flex-1 sm:flex-none"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <LuCheck className="mr-2 h-4 w-4" />
                ) : (
                  <LuCopy className="mr-2 h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-14 w-14 shrink-0"
                asChild
                title="View Stats"
              >
                <a
                  href={`/stats/${shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LuChartBar className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-muted-foreground font-medium">
        Free links expire in 30 days.{" "}
        <a
          href="/register"
          className="underline underline-offset-4 hover:text-primary decoration-primary/50 text-foreground/80"
        >
          Create an account
        </a>{" "}
        for permanent links and detailed analytics.
      </p>
    </div>
  );
}
