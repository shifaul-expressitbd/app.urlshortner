import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LuMousePointer2,
  LuUsers,
  LuGlobe,
  LuSmartphone,
} from "react-icons/lu";

interface OverviewCardsProps {
  data: {
    totalClicks: number;
    uniqueClicks: number;
    topCountry: string;
    topDevice: string;
  };
  titles?: {
    totalClicks?: string;
    uniqueClicks?: string;
    topCountry?: string;
    topDevice?: string;
  };
  subtitles?: {
    totalClicks?: string;
    uniqueClicks?: string;
    topCountry?: string;
    topDevice?: string;
  };
}

export function OverviewCards({ data, titles, subtitles }: OverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titles?.totalClicks || "Total Clicks"}
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <LuMousePointer2 className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.totalClicks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {subtitles?.totalClicks || "All time clicks"}
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titles?.uniqueClicks || "Unique Visitors"}
          </CardTitle>
          <div className="p-2 bg-blue-500/10 rounded-full">
            <LuUsers className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.uniqueClicks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {subtitles?.uniqueClicks || "Unique IP addresses"}
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titles?.topCountry || "Top Location"}
          </CardTitle>
          <div className="p-2 bg-green-500/10 rounded-full">
            <LuGlobe className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate" title={data.topCountry}>
            {data.topCountry || "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            {subtitles?.topCountry || "Most active country"}
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titles?.topDevice || "Top Device"}
          </CardTitle>
          <div className="p-2 bg-orange-500/10 rounded-full">
            <LuSmartphone className="h-4 w-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate" title={data.topDevice}>
            {data.topDevice || "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            {subtitles?.topDevice || "Most active device type"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
