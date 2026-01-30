import { CRITERIA } from "./spk-data";
import type { Alternative, TOPSISResult } from "./types";

/**
 * Calculates TOPSIS ranking for the given alternatives.
 */
export function calculateTOPSIS(userAlternatives: Alternative[]): TOPSISResult {
  const alternatives = [...userAlternatives];
  const criteriaKeys = ["c1", "c2", "c3", "c4"] as const;

  // 1. Normalization (Rij)
  // Divisor = Sqrt(Sum(x^2)) per column
  const divisors: Record<string, number> = {};

  for (const key of criteriaKeys) {
    const sumSquares = alternatives.reduce(
      (sum, alt) => sum + alt[key] ** 2,
      0
    );
    divisors[key] = Math.sqrt(sumSquares);
  }

  const normalizedMatrix = alternatives.map((alt) => {
    return {
      id: alt.id,
      c1: alt.c1 / divisors.c1,
      c2: alt.c2 / divisors.c2,
      c3: alt.c3 / divisors.c3,
      c4: alt.c4 / divisors.c4,
    };
  });

  // 2. Weighted Normalization
  // Use weights from CRITERIA (Ref: Anjelina, 2024)
  const getWeight = (id: string) =>
    CRITERIA.find((c) => c.id === id)?.weight || 0;

  const weightedMatrix = normalizedMatrix.map((alt) => {
    return {
      id: alt.id,
      c1: alt.c1 * getWeight("c1"),
      c2: alt.c2 * getWeight("c2"),
      c3: alt.c3 * getWeight("c3"),
      c4: alt.c4 * getWeight("c4"),
    };
  });

  // 3. Ideal Solutions (A+ and A-)
  // All criteria are BENEFIT (Max is good)
  const idealPositive: Record<string, number> = {};
  const idealNegative: Record<string, number> = {};

  for (const key of criteriaKeys) {
    const values = weightedMatrix.map((w) => w[key]);
    idealPositive[key] = Math.max(...values);
    idealNegative[key] = Math.min(...values);
  }

  // 4. Distance Calculation (D+ and D-) & Preference Value (V)
  const scoredAlternatives = alternatives.map((alt) => {
    const weightedAlt = weightedMatrix.find((w) => w.id === alt.id);
    if (!weightedAlt) {
      throw new Error(`Weighted alternative not found for id: ${alt.id}`);
    }

    // D+ = Sqrt(Sum((y_i+ - y_ij)^2))
    let distPosSquare = 0;
    for (const key of criteriaKeys) {
      distPosSquare += (idealPositive[key] - weightedAlt[key]) ** 2;
    }
    const distPos = Math.sqrt(distPosSquare);

    // D- = Sqrt(Sum((y_ij - y_i-)^2))
    let distNegSquare = 0;
    for (const key of criteriaKeys) {
      distNegSquare += (weightedAlt[key] - idealNegative[key]) ** 2;
    }
    const distNeg = Math.sqrt(distNegSquare);

    // V = D- / (D- + D+)
    // Avoid division by zero if D- + D+ is 0 (though unlikely in this context)
    const score = distNeg + distPos === 0 ? 0 : distNeg / (distNeg + distPos);

    return {
      ...alt,
      score,
    };
  });

  // 5. Ranking
  scoredAlternatives.sort((a, b) => (b.score || 0) - (a.score || 0));

  return {
    alternatives: scoredAlternatives,
    idealPositive,
    idealNegative,
    matrices: {
      normalized: normalizedMatrix,
      weighted: weightedMatrix,
    },
  };
}
