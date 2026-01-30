"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Alternative } from "@/lib/types";

interface RankingChartProps {
  results: Alternative[];
}

export function RankingChart({ results }: RankingChartProps) {
  // Logic: Get User Input (if any) and Top 3 (excluding user input if redundant, or just top 3 mixed)
  // Request: "Input User vs Top 3 Wisata Ciwidey"

  // 1. Find User Input
  const userAlt = results.find((r) => r.isUserObj);

  // 2. Get Top 3 Non-User Alternatives
  const top3 = results.filter((r) => !r.isUserObj).slice(0, 3);

  // 3. Combine
  const chartData = userAlt ? [userAlt, ...top3] : top3;

  // Sort by score ascending for horizontal bar (Top at top implies bottom in chart data? Or just visualize comparison)
  // Usually Horizontal Bar Chart: YAxis is Name, XAxis is Score.

  return (
    <Card className="rounded-xl border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Analisis Komparasi</CardTitle>
        <CardDescription>
          Perbandingan skor preferensi Anda dengan 3 rekomendasi teratas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid
                horizontal={true}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis domain={[0, 1]} hide type="number" />
              <YAxis
                dataKey="name"
                interval={0}
                tick={{ fontSize: 12 }}
                type="category"
                width={100}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar barSize={32} dataKey="score" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    fill={
                      entry.isUserObj
                        ? "#3b82f6"
                        : index === 0 && !entry.isUserObj && !userAlt
                          ? "#eab308"
                          : "#22c55e"
                    }
                    key={`cell-${entry.id}`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
