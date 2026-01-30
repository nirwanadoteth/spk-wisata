import { CRITERIA } from "./spk-data";
import type { Alternative, CriteriaId, TOPSISResult } from "./types";

/**
 * Calculates TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
 * ranking for the given tourism destination alternatives.
 *
 * @param userAlternatives - Array of tourism destinations to evaluate
 * @returns TOPSIS calculation result with ranked alternatives and calculation matrices
 *
 * @see https://en.wikipedia.org/wiki/TOPSIS for algorithm details
 */
export function calculateTOPSIS(
  userAlternatives: readonly Alternative[]
): TOPSISResult {
  // Create mutable copy for processing
  const alternatives = [...userAlternatives];
  const criteriaKeys: readonly CriteriaId[] = ["c1", "c2", "c3", "c4"] as const;

  // 1. Normalization (Rij)
  // Divisor = Sqrt(Sum(x^2)) per column
  const divisors = new Map<CriteriaId, number>();

  for (const key of criteriaKeys) {
    const sumSquares = alternatives.reduce(
      (sum, alt) => sum + alt[key] ** 2,
      0
    );
    divisors.set(key, Math.sqrt(sumSquares));
  }

  const normalizedMatrix = alternatives.map((alt) => ({
    id: alt.id,
    c1: alt.c1 / (divisors.get("c1") || 1),
    c2: alt.c2 / (divisors.get("c2") || 1),
    c3: alt.c3 / (divisors.get("c3") || 1),
    c4: alt.c4 / (divisors.get("c4") || 1),
  }));

  // 2. Weighted Normalization
  // Use weights from CRITERIA
  const weights = new Map(CRITERIA.map((c) => [c.id, c.weight]));

  const weightedMatrix = normalizedMatrix.map((alt) => ({
    id: alt.id,
    c1: alt.c1 * (weights.get("c1") || 0),
    c2: alt.c2 * (weights.get("c2") || 0),
    c3: alt.c3 * (weights.get("c3") || 0),
    c4: alt.c4 * (weights.get("c4") || 0),
  }));

  // 3. Ideal Solutions (A+ and A-)
  // All criteria are BENEFIT (Max is good)
  const idealPositive = new Map<CriteriaId, number>();
  const idealNegative = new Map<CriteriaId, number>();

  for (const key of criteriaKeys) {
    const values = weightedMatrix.map((w) => w[key]);
    idealPositive.set(key, Math.max(...values));
    idealNegative.set(key, Math.min(...values));
  }

  // 4. Distance Calculation (D+ and D-) & Preference Value (V)
  const scoredAlternatives = alternatives.map((alt) => {
    const weightedAlt = weightedMatrix.find((w) => w.id === alt.id);
    if (!weightedAlt) {
      throw new Error(`Weighted alternative not found for id: ${alt.id}`);
    }

    // D+ = Sqrt(Sum((y_i+ - y_ij)^2))
    const distPos = Math.sqrt(
      criteriaKeys.reduce((sum, key) => {
        const ideal = idealPositive.get(key) || 0;
        return sum + (ideal - weightedAlt[key]) ** 2;
      }, 0)
    );

    // D- = Sqrt(Sum((y_ij - y_i-)^2))
    const distNeg = Math.sqrt(
      criteriaKeys.reduce((sum, key) => {
        const ideal = idealNegative.get(key) || 0;
        return sum + (weightedAlt[key] - ideal) ** 2;
      }, 0)
    );

    // V = D- / (D- + D+)
    // Avoid division by zero
    const denominator = distNeg + distPos;
    const score = denominator === 0 ? 0 : distNeg / denominator;

    return {
      ...alt,
      score,
    };
  });

  // 5. Ranking (sort by score descending)
  scoredAlternatives.sort((a, b) => (b.score || 0) - (a.score || 0));

  return {
    alternatives: scoredAlternatives,
    idealPositive: Object.fromEntries(idealPositive) as Record<
      CriteriaId,
      number
    >,
    idealNegative: Object.fromEntries(idealNegative) as Record<
      CriteriaId,
      number
    >,
    matrices: {
      normalized: normalizedMatrix,
      weighted: weightedMatrix,
    },
  };
}
