"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Alternative } from "@/lib/types";

/**
 * Sort direction type
 */
type SortDirection = "asc" | "desc" | null;

/**
 * Sortable column keys
 */
type SortableColumn = "rank" | "name" | "score" | "c1" | "c2" | "c3" | "c4";

/**
 * Props for ResultTable component
 */
interface ResultTableProps {
  /** Array of tourism destinations with TOPSIS scores, sorted by rank */
  results: readonly Alternative[];
}

/**
 * Sort Icon Component
 * Displays appropriate icon based on sort state
 */
function SortIcon({
  column,
  sortColumn,
  sortDirection,
}: {
  column: SortableColumn;
  sortColumn: SortableColumn | null;
  sortDirection: SortDirection;
}) {
  if (sortColumn !== column) {
    return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />;
  }
  if (sortDirection === "asc") {
    return <ArrowUp className="h-3.5 w-3.5 text-green-600" />;
  }
  return <ArrowDown className="h-3.5 w-3.5 text-green-600" />;
}

/**
 * Result Table Component
 *
 * Displays detailed ranking table with all evaluated tourism destinations.
 * Shows rank, name, final score, and criteria values with visual indicators.
 *
 * Features:
 * - Sortable columns with visual indicators
 * - Rank badges with special styling for top 3
 * - User-submitted destinations highlighted in blue
 * - Score visualization with progress bars
 * - Criteria values displayed as metadata
 *
 * @component
 * @example
 * ```tsx
 * <ResultTable results={rankedAlternatives} />
 * ```
 */
export function ResultTable({ results }: ResultTableProps) {
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  /**
   * Handle column header click for sorting
   * Cycles through: null -> asc -> desc -> null
   */
  const handleSort = (column: SortableColumn) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  /**
   * Sort results based on current sort state
   * React 19.2: useMemo automatically optimized by React Compiler
   */
  const sortedResults = useMemo(() => {
    if (!(sortColumn && sortDirection)) {
      return results;
    }

    const sorted = [...results].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortColumn === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortColumn === "score" || sortColumn === "rank") {
        // Rank sorting is based on score (lower rank = higher score)
        aValue = a.score ?? 0;
        bValue = b.score ?? 0;
      } else {
        aValue = a[sortColumn];
        bValue = b[sortColumn];
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [results, sortColumn, sortDirection]);

  /**
   * Create a map of original ranks based on TOPSIS score
   * This preserves the original ranking even when table is sorted by other columns
   */
  const originalRanks = useMemo(() => {
    const rankMap = new Map<string, number>();
    results.forEach((alt, index) => {
      rankMap.set(alt.id, index + 1);
    });
    return rankMap;
  }, [results]);
  if (results.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-gray-400 text-lg">Tidak ada data ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 border-b bg-gray-50">
              <TableRow>
                <TableHead
                  className="w-[80px] cursor-pointer text-center font-semibold text-gray-600 text-xs uppercase transition-colors hover:text-green-600"
                  onClick={() => handleSort("rank")}
                >
                  <div className="flex items-center justify-center gap-2">
                    Rank
                    <SortIcon
                      column="rank"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer font-semibold text-gray-600 text-xs uppercase transition-colors hover:text-green-600"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Nama Wisata
                    <SortIcon
                      column="name"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-center font-semibold text-gray-600 text-xs uppercase transition-colors hover:text-green-600"
                  onClick={() => handleSort("score")}
                >
                  <div className="flex items-center justify-center gap-2">
                    Nilai Akhir
                    <SortIcon
                      column="score"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right font-semibold text-gray-600 text-xs uppercase transition-colors hover:text-green-600"
                  onClick={() => handleSort("c1")}
                >
                  <div className="flex items-center justify-end gap-2">
                    Aksesibilitas
                    <SortIcon
                      column="c1"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50">
              {sortedResults.map((alt) => {
                // Get original rank from the map (based on TOPSIS score)
                const originalRank = originalRanks.get(alt.id) ?? 0;

                /**
                 * Determine rank badge styling based on original rank
                 * Gold for 1st, Silver for 2nd, Bronze for 3rd
                 */
                let rankBadgeClass = "bg-gray-100 text-gray-600";
                if (originalRank === 1) {
                  rankBadgeClass = "bg-yellow-100 text-yellow-700 shadow-sm"; // Gold
                }
                if (originalRank === 2) {
                  rankBadgeClass = "bg-gray-100 text-gray-700 shadow-sm"; // Silver
                }
                if (originalRank === 3) {
                  rankBadgeClass = "bg-orange-50 text-orange-700 shadow-sm"; // Bronze
                }

                // Highlight user-submitted destinations
                const isUserRow = alt.isUserObj;
                const rowClass = isUserRow
                  ? "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500 transition-colors group relative"
                  : "hover:bg-green-50/30 transition-colors group";

                return (
                  <TableRow className={rowClass} key={alt.id}>
                    <TableCell className="p-4 text-center">
                      <div
                        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs ${rankBadgeClass}`}
                      >
                        {originalRank <= 3 ? (
                          <Trophy className="h-4 w-4" />
                        ) : (
                          `#${originalRank}`
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2 font-semibold text-base text-gray-900">
                        {alt.name}
                        {isUserRow && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 font-bold text-[10px] text-blue-700 uppercase tracking-wider">
                            Anda
                          </span>
                        )}
                      </div>
                      {/* Display C2 (Daya Tarik), C3 (Fasilitas), and C4 (Kualitas Layanan) as key highlights */}
                      <div className="mt-0.5 font-mono text-gray-400 text-xs">
                        DT: {alt.c2.toFixed(1)} | F: {alt.c3.toFixed(1)} | KL:{" "}
                        {alt.c4.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold font-mono text-base text-green-600">
                          {alt.score?.toFixed(4)}
                        </span>
                        {/* Visual Progress Bar */}
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: `${(alt.score || 0) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    {/* C1: Aksesibilitas */}
                    <TableCell className="p-4 text-right font-mono text-gray-600">
                      {alt.c1.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
