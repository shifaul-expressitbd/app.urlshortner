"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

interface AnalyticsChartProps {
  data: {
    date: string;
    clicks: number;
  }[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              // Format date if needed, assuming ISO string or similar
              const d = new Date(value);
              return d.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--popover-foreground))" }}
            itemStyle={{ color: "hsl(var(--primary))" }}
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorClicks)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
