"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Alternative } from "@/lib/types";

/**
 * Props for StatsWidget component
 */
interface StatsWidgetProps {
  /** Array of tourism destinations with TOPSIS scores */
  results: readonly Alternative[];
}

/**
 * Statistics Widget Component
 *
 * Displays summary statistics of the evaluation results.
 *
 * @component
 */
export function StatsWidget({ results }: StatsWidgetProps) {
  if (results.length === 0) {
    return null;
  }

  const totalAlternatives = results.length;
  const scores = results.map((r) => r.score || 0);
  const highestScore = Math.max(...scores);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const scoreGap =
    results.length > 1 ? (results[0].score || 0) - (results[1].score || 0) : 0;

  const stats = [
    { label: "Total Alternatif", value: totalAlternatives, suffix: "" },
    { label: "Skor Tertinggi", value: highestScore, suffix: "" },
    { label: "Skor Rata-rata", value: avgScore, suffix: "" },
    { label: "Gap #1 - #2", value: scoreGap, suffix: "" },
  ];

  return (
    <Card className="lg:col-span-1" size="sm">
      <CardHeader>
        <CardTitle className="text-base">Statistik Evaluasi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              className="flex flex-col rounded-lg border border-gray-200 bg-gray-50/50 p-2"
              key={stat.label}
            >
              <span className="text-gray-600 text-xs">{stat.label}</span>
              <span className="font-bold text-gray-900 text-lg">
                {typeof stat.value === "number" && !Number.isInteger(stat.value)
                  ? stat.value.toFixed(4)
                  : stat.value}
                {stat.suffix}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
