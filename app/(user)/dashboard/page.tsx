"use client";

import { useState } from "react";
import { api } from "@/lib/api-client";
import { Link, PaginatedResponse } from "@/components/dashboard/types";
import { LinkTable } from "@/components/dashboard/link-table";
import { CreateLinkCard } from "@/components/dashboard/create-link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LuMousePointer2,
  LuLink,
  LuLoader,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import useSWR from "swr";

const fetcher = (url: string) => api.get<PaginatedResponse<Link>>(url);

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, mutate } = useSWR(
    `/urls?page=${page}&limit=${limit}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
    },
  );

  const links = data?.items || [];
  const meta = data?.meta;

  // Calculate stats from current view or separate stats endpoint?
  // Ideally stats come from a separate endpoint or meta, but for now we display 'Active shortened URLs' from meta.total
  // Total clicks across ALL links isn't readily available in the paginated list unless the API provides it.
  // For now, I'll assume we might want to fetch stats separately or just show what we have.
  // Given I see 'totalLinks' in previous code, I'll use meta.total for that.

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md border border-destructive/20">
          Failed to load data. Please try again.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Create Card */}
        <CreateLinkCard className="col-span-2" onLinkCreated={() => mutate()} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <LuLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active shortened URLs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Clicks</CardTitle>
            <LuMousePointer2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Note: This is only summing clicks of visible items, which is inaccurate for 'Total'. 
                Ideally backend provides this stat. I will leave it as is or hide if misleading? 
                Let's show it as "Clicks (Page)" or similar if we can't get global total. 
                Actually, the API `findAll` returns meta. 
                For now, I'll just sum the page as a placeholder or remove it if confusing. 
                Let's keep it but label it 'Clicks (Recent Links)'. 
            */}
            <div className="text-2xl font-bold">
              {links
                .reduce((acc: number, curr: Link) => acc + curr.totalClicks, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Clicks on recent links
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Links</h3>
        </div>

        <LinkTable
          links={links}
          isLoading={isLoading}
          onRefresh={() => mutate()}
        />

        {/* Pagination Controls */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!meta.hasPrevPage}
            >
              <LuChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {meta.page} of {meta.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={!meta.hasNextPage}
            >
              Next
              <LuChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
