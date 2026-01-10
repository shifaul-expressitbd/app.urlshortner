"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api-client";
import {
  LuLoader,
  LuMousePointer,
  LuCalendar,
  LuGlobe,
  LuMonitor,
} from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PublicStats {
  allTime: {
    totalClicks: number;
    uniqueClicks: number;
  };
  lastClickAt: string | null;
  createdAt: string;
  // We can add more if the backend returns it
}

export default function PublicStatsPage() {
  const params = useParams();
  const code = params.code as string;
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get<PublicStats>(`/analytics/public/${code}`);
        setStats(data);
      } catch (err: any) {
        setError(
          err.message ||
            "Failed to load stats. This link might be private or not exist.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchStats();
    }
  }, [code]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LuLoader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <LuGlobe className="h-6 w-6 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 ">
      <div className="mb-8 text-center">
        <Badge variant="outline" className="mb-4">
          Public Statistics
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Link Stats: <span className="text-primary">/{code}</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Viewing real-time performance data for this public link.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <LuMousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.allTime.totalClicks}
            </div>
            <p className="text-xs text-muted-foreground">
              All time interactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
            <LuGlobe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.allTime.uniqueClicks}
            </div>
            <p className="text-xs text-muted-foreground">
              Distinct IP addresses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
            <LuCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lg">
              {new Date(stats?.createdAt || "").toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Date link was generated
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <LuMonitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lg">
              {stats?.lastClickAt
                ? new Date(stats.lastClickAt).toLocaleDateString()
                : "Never"}
            </div>
            <p className="text-xs text-muted-foreground">Most recent click</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center bg-muted/50 rounded-lg p-8">
        <h3 className="text-lg font-semibold mb-2">Want deeper insights?</h3>
        <p className="text-muted-foreground mb-4">
          Create a free account to track locations, devices, browsers, and
          detailed timeseries data.
        </p>
        <a
          href="/register"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Create Free Account
        </a>
      </div>
    </div>
  );
}
