"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: number;
  percentage?: number;
}

interface StatsListProps {
  title: string;
  items: StatItem[];
}

export function StatsList({ title, items }: StatsListProps) {
  return (
    <Card className="col-span-full md:col-span-1 lg:col-span-2 hover:shadow-sm transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium truncate">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${item.percentage || 0}%` }}
                  />
                </div>
              </div>
              <div className="font-medium text-sm tabular-nums w-12 text-right shrink-0">
                {item.value}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-4">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
