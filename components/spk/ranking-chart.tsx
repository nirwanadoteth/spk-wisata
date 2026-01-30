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

/**
 * Props for RankingChart component
 */
interface RankingChartProps {
  /** Array of tourism destinations with TOPSIS scores */
  results: readonly Alternative[];
}

/**
 * Chart configuration for Recharts
 */
const chartConfig = {
  score: {
    label: "Skor",
    color: "var(--chart-1)",
  },
  label: {
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

/**
 * Ranking Chart Component
 *
 * Displays a horizontal bar chart comparing user input with top 3 recommendations.
 * Uses different colors to distinguish user input from system recommendations.
 *
 * Color scheme:
 * - Blue (chart-1): User input
 * - Yellow (chart-2): Top recommendation
 * - Green (chart-3): Other recommendations
 *
 * @component
 * @example
 * ```tsx
 * <RankingChart results={sortedAlternatives} />
 * ```
 */
export function RankingChart({ results }: RankingChartProps) {
  // Find user-submitted destination
  const userAlt = results.find((r) => r.isUserObj);

  // Get top 3 system recommendations (non-user destinations)
  const top3 = results.filter((r) => !r.isUserObj).slice(0, 3);

  // Combine user destination with top 3 for comparison
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
