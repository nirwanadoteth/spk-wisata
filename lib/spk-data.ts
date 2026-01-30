import type { Alternative, Criteria } from "./types";

export const CRITERIA: Criteria[] = [
  {
    id: "c1",
    name: "Aksesibilitas",
    weight: 4,
    maxScore: 16,
    attribute: "benefit",
  },
  {
    id: "c2",
    name: "Daya Tarik",
    weight: 5,
    maxScore: 28,
    attribute: "benefit",
  },
  {
    id: "c3",
    name: "Fasilitas",
    weight: 5,
    maxScore: 32,
    attribute: "benefit",
  },
  {
    id: "c4",
    name: "Kualitas Layanan",
    weight: 4,
    maxScore: 20,
    attribute: "benefit",
  },
];

// Raw Data from Fatimah (2013)
export const RAW_ALTERNATIVES: Alternative[] = [
  { id: "1", name: "Kawah Putih", c1: 12, c2: 26, c3: 31, c4: 19 },
  { id: "2", name: "TWA Cimanggu", c1: 11, c2: 25, c3: 28, c4: 17 },
  { id: "3", name: "Ranca Upas", c1: 11, c2: 26, c3: 32, c4: 18 },
  { id: "4", name: "Air Panas Ciwalini", c1: 11, c2: 20, c3: 34, c4: 17 },
  { id: "5", name: "Situ Lembang", c1: 10, c2: 19, c3: 23, c4: 10 },
  { id: "6", name: "Kawah Cibuni", c1: 9, c2: 22, c3: 20, c4: 10 },
];

/**
 * Normalizes a raw value to a 1-4 scale.
 * Formula: (Value / MaxPossibleScore) * 4
 */
export function normalizeToScale4(
  value: number,
  maxPossibleScore: number
): number {
  if (maxPossibleScore === 0) {
    return 0;
  }
  return (value / maxPossibleScore) * 4;
}

/**
 * Returns the dataset with "Old Data" scaled to 1-4.
 * This ensures apple-to-apple comparison with 1-4 User Input.
 */
export function getScaledAlternatives(
  rawAlternatives: Alternative[] = RAW_ALTERNATIVES
): Alternative[] {
  return rawAlternatives.map((alt) => {
    return {
      ...alt,
      c1: normalizeToScale4(alt.c1, 16), // C1 Max: 16
      c2: normalizeToScale4(alt.c2, 28), // C2 Max: 28
      c3: normalizeToScale4(alt.c3, 32), // C3 Max: 32
      c4: normalizeToScale4(alt.c4, 20), // C4 Max: 20
    };
  });
}

// Export scaled version for initial display if needed, but usually we use getScaledAlternatives()
export const INITIAL_ALTERNATIVES = getScaledAlternatives();
