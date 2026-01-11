"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LuCheck,
  LuLoader,
  LuPlus,
  LuGlobe,
  LuInfo,
  LuRefreshCw,
  LuTrash2,
} from "react-icons/lu";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DomainModal } from "@/components/dashboard/settings/domain-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// --- DOMAINS TAB ---

interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  isVerified: boolean; // Assuming this fields exists or similar
  status: "ACTIVE" | "PENDING" | "FAILED";
}

function DomainsTab() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDomains() {
    try {
      setLoading(true);
      const res = await api.get<Domain[]>("/domains");
      setDomains(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDomains();
  }, []);

  // Stub for add domain
  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Domain creation to be implemented with proper modal");
  };

  const handleDeleteDomain = async (id: string) => {
    try {
      await api.delete(`/domains/${id}`);
      toast.success("Domain deleted successfully");
      fetchDomains();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete domain");
    }
  };

  const handleVerifyDomain = async (id: string) => {
    try {
      const result = await api.post<{ verified: boolean; message?: string }>(
        `/domains/${id}/verify`,
        {},
      );
      if (result.verified) {
        toast.success("Domain verified successfully!");
      } else {
        toast.info(
          result.message ||
          "Verification pending. Please check your DNS configuration.",
        );
      }
      fetchDomains();
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Custom Domains</CardTitle>
          <CardDescription>
            Connect your own domains to create branded short links.
          </CardDescription>
        </div>
        <DomainModal onDomainAdded={fetchDomains} />
      </CardHeader>
      <CardContent className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Deleted inline form */}

        <div className="rounded-md border">
          <div className="p-4">
            {loading ? (
              <LuLoader className="animate-spin" />
            ) : domains.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No custom domains connected.
              </div>
            ) : (
              <div className="space-y-4">
                {domains.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                        <LuGlobe />
                      </div>
                      <div>
                        <p className="font-medium">{d.domain}</p>
                        <p className="text-xs text-muted-foreground">
                          {d.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {d.status === "ACTIVE" ? (
                        <Badge className="bg-green-600">Active</Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyDomain(d.id)}
                        >
                          <LuRefreshCw className="w-3 h-3 mr-1" /> Verify
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Domain</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <strong>{d.domain}</strong>? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeleteDomain(d.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DNS Configuration Guide */}
        <div className="col-span-2 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <LuInfo className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <h4 className="font-semibold">DNS Configuration Guide</h4>
              <p className="text-sm text-muted-foreground">
                To connect your custom domain, configure the following DNS
                records with your domain registrar:
              </p>
              <div className="space-y-2">
                <div className="bg-background rounded-md p-3 border">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Option 1: CNAME Record (Recommended)
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>{" "}
                      <code className="bg-muted px-1 rounded">CNAME</code>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      <code className="bg-muted px-1 rounded">links</code>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value:</span>{" "}
                      <code className="bg-muted px-1 rounded">
                        cutzy.app
                      </code>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                DNS changes may take up to 48 hours to propagate. After
                configuration, click &quot;Verify&quot; on your domain to check
                the status.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- PROFILE TAB ---

import { useAuth } from "@/components/auth-provider";

function ProfileTab() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your public profile and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input disabled value={user?.email || ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">First Name</Label>
          <Input id="firstName" defaultValue={user?.firstName || ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue={user?.lastName || ""} />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="domains">Custom Domains</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="domains">
          <DomainsTab />
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Change your password and manage sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
