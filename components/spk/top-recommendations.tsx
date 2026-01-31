"use client";

import { Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Alternative } from "@/lib/types";

/**
 * Props for TopRecommendations component
 */
interface TopRecommendationsProps {
  /** Array of tourism destinations with TOPSIS scores */
  results: readonly Alternative[];
}

/**
 * Top Recommendations Widget Component
 *
 * Displays the top 3 recommendations with winner prominently featured.
 *
 * @component
 */
export function TopRecommendations({ results }: TopRecommendationsProps) {
  if (results.length === 0) {
    return (
      <Card
        className="relative overflow-hidden rounded-xl border-green-200 bg-linear-to-br from-green-50 to-emerald-50 shadow-sm lg:col-span-1"
        size="sm"
      >
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-green-200 opacity-50" />
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 shadow-green-200 shadow-lg">
              <Award className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-base text-green-800">
              Rekomendasi Teratas
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            Tidak ada data untuk ditampilkan.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="relative overflow-hidden rounded-xl border-green-200 bg-linear-to-br from-green-50 to-emerald-50 shadow-sm lg:col-span-1"
      size="sm"
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-green-200 opacity-50" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 shadow-green-200 shadow-lg">
            <Award className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base text-green-800">
            Rekomendasi Teratas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Pemenang */}
        <div className="mb-1.5 rounded-lg border border-green-200 bg-white/70 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100">
                <Award className="h-3.5 w-3.5 text-yellow-600" />
              </div>
              <span className="font-bold text-gray-800 text-sm">
                {results[0].name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="font-bold text-green-600 text-sm">
                {(() => {
                  const percentage = (results[0].score ?? 0) * 100;
                  return Number.isInteger(percentage)
                    ? `${percentage}%`
                    : `${percentage.toFixed(1)}%`;
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Runner-ups */}
        {results.length > 1 && (
          <div className="space-y-1.5">
            {results.slice(1, 3).map((alt, idx) => (
              <div
                className="flex items-center justify-between rounded-lg border border-green-100 bg-white/50 p-2"
                key={alt.id}
              >
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 text-xs">
                    {idx + 2}
                  </span>
                  <span className="font-medium text-gray-700 text-xs">
                    {alt.name}
                  </span>
                </div>
                <span className="font-semibold text-gray-500 text-xs">
                  {(() => {
                    const percentage = (alt.score ?? 0) * 100;
                    return Number.isInteger(percentage)
                      ? `${percentage}%`
                      : `${percentage.toFixed(1)}%`;
                  })()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
