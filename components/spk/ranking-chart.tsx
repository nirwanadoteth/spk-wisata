"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
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
    label: "Skor",
    color: "var(--chart-1)",
  },
  label: {
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

export function RankingChart({ results }: RankingChartProps) {
  // 1. Find User Input
  const userAlt = results.find((r) => r.isUserObj);

  // 2. Get Top 3 Non-User Alternatives
  const top3 = results.filter((r) => !r.isUserObj).slice(0, 3);

  // 3. Combine and add fill colors
  const rawData = userAlt ? [userAlt, ...top3] : top3;

  const chartData = rawData.map((item, index) => {
    let fill = "var(--chart-3)"; // green - recommended

    if (item.isUserObj) {
      fill = "var(--chart-1)"; // blue - user input
    } else if (index === 0 && !userAlt) {
      fill = "var(--chart-2)"; // yellow - top recommendation
    } else if (userAlt && index === 1) {
      fill = "var(--chart-2)"; // yellow - top recommendation (when user exists)
    }

    return {
      ...item,
      fill,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analisis Komparasi</CardTitle>
        <CardDescription>
          Perbandingan skor preferensi Anda dengan 3 rekomendasi teratas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <YAxis
              axisLine={false}
              dataKey="name"
              hide
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
              type="category"
            />
            <XAxis dataKey="score" domain={[0, 1]} hide type="number" />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Bar barSize={64} dataKey="score" layout="vertical" radius={4}>
              <LabelList
                className="fill-(--color-label)"
                dataKey="name"
                fontSize={12}
                offset={8}
                position="insideLeft"
              />
              <LabelList
                className="fill-foreground"
                dataKey="score"
                fontSize={12}
                formatter={(value: number) => value.toFixed(3)}
                offset={8}
                position="right"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
