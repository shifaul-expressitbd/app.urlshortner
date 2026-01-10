"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeseriesChartProps {
  data: { date: string; clicks: number }[]
}

export function TimeseriesChart({ data }: TimeseriesChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Clicks Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#2563eb" // primary
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
