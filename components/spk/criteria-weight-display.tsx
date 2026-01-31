"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CRITERIA } from "@/lib/spk-data";

/**
 * Criteria Weight Display Component
 *
 * Displays the weight of each criterion with visual indicators.
 * Helps users understand which factors have the most influence.
 *
 * @component
 */
export function CriteriaWeightDisplay() {
  const totalWeight = CRITERIA.reduce((sum, c) => sum + c.weight, 0);

  return (
    <Card className="lg:col-span-1" size="sm">
      <CardHeader>
        <CardTitle className="text-base">Bobot Kriteria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {CRITERIA.map((criterion) => {
            const percentage = (criterion.weight / totalWeight) * 100;
            return (
              <div className="space-y-1" key={criterion.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 text-xs">
                    {criterion.name}
                  </span>
                  <span className="font-bold text-gray-900 text-xs">
                    {criterion.weight}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-green-400 to-green-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
