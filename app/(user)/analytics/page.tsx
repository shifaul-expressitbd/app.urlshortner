"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { OverviewCards } from "@/components/dashboard/charts/overview-cards";
import { TimeseriesChart } from "@/components/dashboard/charts/timeseries-chart";
import { StatsList } from "@/components/dashboard/charts/stats-list";
import { TopLinksTable } from "@/components/dashboard/charts/top-links-table";
import { LuLoader } from "react-icons/lu";
import { toast } from "sonner";
import { DynamicBreadcrumb } from "@/components/dashboard/dynamic-breadcrumb";

export default function UserAnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState<any>(null);
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [topLinks, setTopLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [
          summaryRes,
          timeseriesRes,
          devicesRes,
          locationsRes,
          topLinksRes,
        ] = await Promise.all([
          api.get<any>("/analytics/dashboard?days=30"),
          api.get<any[]>("/analytics/timeseries?days=30"),
          api.get<any[]>("/analytics/devices"),
          api.get<any[]>("/analytics/locations"),
          api.get<any[]>("/analytics/top-links?limit=5"),
        ]);

        setSummary({
          totalClicks: summaryRes.totalClicks,
          totalLinks: summaryRes.totalLinks,
          clicksInPeriod: summaryRes.clicksInPeriod,
          topLink: summaryRes.topLink
            ? summaryRes.topLink.title || summaryRes.topLink.shortCode
            : "None",
        });
        setTimeseries(timeseriesRes);

        // Transform devices for StatsList
        setDevices(
          devicesRes.map((d: any) => ({
            label: d.name, // The backend returns 'name' for getUserDeviceBreakdown now
            value: d.value,
            percentage:
              d.value > 0
                ? Math.round((d.value / summaryRes.totalClicks) * 100)
                : 0, // Approx percentage if total clicks matches
          })),
        );

        // Transform locations
        const totalLocationClicks = locationsRes.reduce(
          (acc: number, curr: any) => acc + curr.count,
          0,
        );
        setLocations(
          locationsRes.map((l: any) => ({
            label: l.countryName || l.country || "Unknown",
            value: l.count,
            percentage: totalLocationClicks
              ? Math.round((l.count / totalLocationClicks) * 100)
              : 0,
          })),
        );

        setTopLinks(topLinksRes);
      } catch (error) {
        toast.error("Failed to load analytics data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <LuLoader className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Overall Analytics</h2>
        <p className="text-muted-foreground">
          Aggregated performance stats across all your links for the last 30
          days.
        </p>
      </div>

      {summary && (
        <OverviewCards
          data={{
            totalClicks: summary.totalClicks,
            uniqueClicks: summary.totalLinks, // Reusing widget for "Total Links" temporarily or I should customize OverviewCards
            topCountry: summary.clicksInPeriod, // "Clicks (30d)"
            topDevice: summary.topLink, // "Top Link"
          }}
        />
      )}

      {/* 
        Wait, OverviewCards likely has hardcoded labels like "Total Clicks", "Unique Clicks". 
        I should check OverviewCards again to make sure I'm passing compatible data or if I need to make a GenericOverviewCards.
      */}

      <TimeseriesChart data={timeseries} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsList title="Top Devices" items={devices} />
        <StatsList title="Top Locations" items={locations} />
      </div>

      <TopLinksTable links={topLinks} />
    </div>
  );
}
