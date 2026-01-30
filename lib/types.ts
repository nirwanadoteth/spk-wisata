export interface Criteria {
  id: 'c1' | 'c2' | 'c3' | 'c4';
  name: string;
  weight: number;
  maxScore: number; // Added for normalization
  attribute: 'benefit' | 'cost';
}

export interface Alternative {
  id: string;
  name: string;
  c1: number; // Aksesibilitas
  c2: number; // Daya Tarik
  c3: number; // Fasilitas
  c4: number; // Kualitas Layanan
  score?: number; // Final Preference Value (V)
  isUserObj?: boolean; // To highlight user input
}

export interface MatrixItem {
  id: string;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
}

export interface TOPSISResult {
  alternatives: Alternative[];
  idealPositive: Record<string, number>;
  idealNegative: Record<string, number>;
  matrices: {
    normalized: MatrixItem[];
    weighted: MatrixItem[];
  };
}
