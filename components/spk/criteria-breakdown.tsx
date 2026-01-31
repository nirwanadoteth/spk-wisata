"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CRITERIA } from "@/lib/spk-data";
import type { Alternative } from "@/lib/types";

/**
 * Props for CriteriaBreakdown component
 */
interface CriteriaBreakdownProps {
  /** Array of tourism destinations with TOPSIS scores */
  results: readonly Alternative[];
}

/**
 * Criteria Breakdown Component
 *
 * Displays detailed breakdown of criteria values for the top destination.
 * Shows each criterion with visual indicator based on its value.
 *
 * @component
 */
export function CriteriaBreakdown({ results }: CriteriaBreakdownProps) {
  if (results.length === 0) {
    return null;
  }

  const winner = results[0];

  // Get criteria values
  const criteriaValues = [
    {
      id: "c1",
      name: CRITERIA[0].name,
      value: winner.c1,
    },
    {
      id: "c2",
      name: CRITERIA[1].name,
      value: winner.c2,
    },
    {
      id: "c3",
      name: CRITERIA[2].name,
      value: winner.c3,
    },
    {
      id: "c4",
      name: CRITERIA[3].name,
      value: winner.c4,
    },
  ];

  // Function to get color based on value (1-4 scale)
  const getValueColor = (value: number) => {
    if (value >= 3.5) {
      return "bg-green-100 text-green-700 border-green-200";
    }
    if (value >= 2.5) {
      return "bg-blue-100 text-blue-700 border-blue-200";
    }
    if (value >= 1.5) {
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <Card className="lg:col-span-1" size="sm">
      <CardHeader>
        <CardTitle className="text-base">Breakdown Kriteria Pemenang</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {criteriaValues.map((criteria) => (
            <div
              className={`flex items-center justify-between rounded-lg border px-2 ${getValueColor(criteria.value)}`}
              key={criteria.id}
            >
              <div className="flex flex-col">
                <span className="font-medium text-xs">{criteria.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg">{criteria.value}</span>
                <span className="text-[10px] opacity-70">/4</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
