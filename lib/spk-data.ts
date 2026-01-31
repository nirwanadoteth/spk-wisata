import type { Alternative, Criteria } from "./types";

export const CRITERIA: Criteria[] = [
  {
    id: "c1",
    name: "Keindahan Alam",
    weight: 5,
    attribute: "benefit",
  },
  {
    id: "c2",
    name: "Kondisi Akses Jalan",
    weight: 5,
    attribute: "benefit",
  },
  {
    id: "c3",
    name: "Ketersediaan Fasilitas",
    weight: 4,
    attribute: "benefit",
  },
  {
    id: "c4",
    name: "Kebersihan",
    weight: 3,
    attribute: "benefit",
  },
];

// Data alternatif wisata dengan skala 1-4
export const INITIAL_ALTERNATIVES: Alternative[] = [
  { id: "1", name: "Kawah Putih", c1: 4, c2: 4, c3: 4, c4: 3 },
  { id: "2", name: "TWA Cimanggu", c1: 3, c2: 3, c3: 4, c4: 3 },
  { id: "3", name: "Ranca Upas", c1: 4, c2: 3, c3: 4, c4: 3 },
  { id: "4", name: "Air Panas Ciwalini", c1: 3, c2: 3, c3: 4, c4: 3 },
  { id: "5", name: "Situ Lembang", c1: 4, c2: 2, c3: 3, c4: 3 },
  { id: "6", name: "Kawah Cibuni", c1: 3, c2: 1, c3: 3, c4: 3 },
];
