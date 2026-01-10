"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { api } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsChart } from "@/components/analytics/analytics-chart";
import {
  LuMousePointer2,
  LuGlobe,
  LuSmartphone,
  LuLaptop,
  LuChrome,
  LuCalendar,
} from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Define types locally for now, or move to types.ts
interface AnalyticsSummary {
  allTime: {
    totalClicks: number;
    uniqueClicks: number;
  };
  period: {
    days: number;
    totalClicks: number;
    uniqueClicks: number;
  };
}

interface TimeseriesData {
  date: string;
  clicks: number;
}

interface BreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

const fetcher = <T,>(url: string) => api.get<T>(url);

export default function AnalyticsPage() {
  const params = useParams();
  const id = params.id as string;
  const [days, setDays] = useState("30");

  // Fetch Summary
  const { data: summary, isLoading: loadingSummary } = useSWR<AnalyticsSummary>(
    `/urls/${id}/analytics?days=${days}`,
    (url: string) => fetcher<AnalyticsSummary>(url),
  );

  // Fetch Timeseries
  const { data: timeseries, isLoading: loadingTimeseries } = useSWR<
    TimeseriesData[]
  >(`/urls/${id}/analytics/timeseries?days=${days}`, (url: string) =>
    fetcher<TimeseriesData[]>(url),
  );

  // Fetch Devices
  const { data: devices, isLoading: loadingDevices } = useSWR<any[]>(
    `/urls/${id}/analytics/devices`,
    (url: string) => fetcher<any[]>(url),
  );

  // Fetch Locations
  const { data: locations, isLoading: loadingLocations } = useSWR<any[]>(
    `/urls/${id}/analytics/locations?limit=5`,
    (url: string) => fetcher<any[]>(url),
  );

  // Fetch Referrers
  const { data: referrers, isLoading: loadingReferrers } = useSWR<any[]>(
    `/urls/${id}/analytics/referrers?limit=5`,
    (url: string) => fetcher<any[]>(url),
  );

  const isLoading =
    loadingSummary || loadingTimeseries || loadingDevices || loadingLocations;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-2">
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <LuMousePointer2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingSummary ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                summary?.period.totalClicks
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              In the last {days} days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Clicks</CardTitle>
            <LuGlobe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingSummary ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                summary?.period.uniqueClicks
              )}
            </div>
            <p className="text-xs text-muted-foreground">Unique visitors</p>
          </CardContent>
        </Card>
        {/* Placeholder cards for now */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
            <LuGlobe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">
              {loadingLocations ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                locations?.[0]?.countryName || locations?.[0]?.country || "-"
              )}
            </div>
            <p className="text-xs text-muted-foreground">Most visitors from</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Device</CardTitle>
            <LuSmartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {loadingDevices ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                devices?.[0]?.deviceType?.toLowerCase() || "-"
              )}
            </div>
            <p className="text-xs text-muted-foreground">Most popular device</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Clicks Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {loadingTimeseries ? (
              <Skeleton className="h-[300px] w-full" />
            ) : timeseries ? (
              <AnalyticsChart data={timeseries} />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLocations ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {locations?.map((loc, i) => (
                  <div key={i} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {loc.countryName || loc.country}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {loc.clicks} clicks
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {/* Calculate % if needed, or just show raw */}
                    </div>
                  </div>
                ))}
                {locations?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No location data yet.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDevices ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {devices?.map((device, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LuSmartphone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium capitalize">
                        {device.deviceType?.toLowerCase() || "Unknown"}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {device.percentage}% ({device.clicks})
                    </div>
                  </div>
                ))}
                {devices?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No device data yet.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingReferrers ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {referrers?.map((ref, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <span
                        className="text-sm font-medium truncate"
                        title={ref.referer}
                      >
                        {ref.referer || "Direct"}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ref.clicks} clicks
                    </div>
                  </div>
                ))}
                {referrers?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No referrer data yet.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
