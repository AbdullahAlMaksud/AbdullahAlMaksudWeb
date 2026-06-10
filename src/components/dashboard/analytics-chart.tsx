"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { SpotlightCard } from "@/components/common/spotlight-card"
import type { ChartPoint } from "@/types/content"

export function AnalyticsChart({
  data,
  labels,
}: {
  data: ChartPoint[]
  labels: {
    title: string
    range: string
  }
}) {
  return (
    <SpotlightCard className="min-h-[320px]">
      <div className="p-5">
        <div className="mb-5">
          <h3 className="font-semibold">{labels.title}</h3>
          <p className="text-sm text-muted-foreground">{labels.range}</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart data={data} margin={{ left: -18, right: 8 }}>
              <defs>
                <linearGradient id="views" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--popover)",
                  color: "var(--popover-foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--primary)"
                fill="url(#views)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="reads"
                stroke="var(--chart-2)"
                fill="transparent"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SpotlightCard>
  )
}
