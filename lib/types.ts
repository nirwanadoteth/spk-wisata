/**
 * Type definitions for the TOPSIS Decision Support System
 * Following React 19.2 and TypeScript best practices
 */

/** Criteria identifiers used in TOPSIS calculation */
export type CriteriaId = "c1" | "c2" | "c3" | "c4";

/** Criteria attribute type for TOPSIS */
export type CriteriaAttribute = "benefit" | "cost";

/**
 * Criteria interface for TOPSIS evaluation
 * All properties are readonly for immutability
 */
export interface Criteria {
  readonly id: CriteriaId;
  readonly name: string;
  readonly weight: number;
  readonly maxScore: number;
  readonly attribute: CriteriaAttribute;
}

/**
 * Alternative (tourism destination) for evaluation
 * Represents a tourism destination with criteria scores
 */
export interface Alternative {
  readonly id: string;
  readonly name: string;
  /** Aksesibilitas (Accessibility) score */
  readonly c1: number;
  /** Daya Tarik (Attractiveness) score */
  readonly c2: number;
  /** Fasilitas (Facilities) score */
  readonly c3: number;
  /** Kualitas Layanan (Service Quality) score */
  readonly c4: number;
  /** Final Preference Value (V) from TOPSIS calculation */
  readonly score?: number;
  /** Flag to indicate user-submitted destination */
  readonly isUserObj?: boolean;
}

/**
 * Matrix item for TOPSIS calculations
 * Contains normalized or weighted values
 */
export interface MatrixItem {
  readonly id: string;
  readonly c1: number;
  readonly c2: number;
  readonly c3: number;
  readonly c4: number;
}

/**
 * TOPSIS calculation result
 * Contains sorted alternatives and calculation matrices
 */
export interface TOPSISResult {
  readonly alternatives: readonly Alternative[];
  readonly idealPositive: Readonly<Record<CriteriaId, number>>;
  readonly idealNegative: Readonly<Record<CriteriaId, number>>;
  readonly matrices: {
    readonly normalized: readonly MatrixItem[];
    readonly weighted: readonly MatrixItem[];
  };
}
