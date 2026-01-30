"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Alternative } from "@/lib/types";

interface RankingChartProps {
  results: Alternative[];
}

const chartConfig = {
  score: {
    label: "Skor: ",
  },
  user: {
    label: "Input Anda",
    color: "hsl(217 91% 60%)",
  },
  top: {
    label: "Rekomendasi Terbaik",
    color: "hsl(45 93% 47%)",
  },
  recommended: {
    label: "Rekomendasi",
    color: "hsl(142 71% 45%)",
  },
} satisfies ChartConfig;

export function RankingChart({ results }: RankingChartProps) {
  // 1. Find User Input
  const userAlt = results.find((r) => r.isUserObj);

  // 2. Get Top 3 Non-User Alternatives
  const top3 = results.filter((r) => !r.isUserObj).slice(0, 3);

  // 3. Combine
  const chartData = userAlt ? [userAlt, ...top3] : top3;

  return (
    <Card className="rounded-xl border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Analisis Komparasi</CardTitle>
        <CardDescription>
          Perbandingan skor preferensi Anda dengan 3 rekomendasi teratas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
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
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar barSize={32} dataKey="score" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => {
                const getColor = () => {
                  if (entry.isUserObj) {
                    return chartConfig.user.color;
                  }
                  if (index === 0 && !userAlt) {
                    return chartConfig.top.color;
                  }
                  return chartConfig.recommended.color;
                };

                return <Cell fill={getColor()} key={`cell-${entry.id}`} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
