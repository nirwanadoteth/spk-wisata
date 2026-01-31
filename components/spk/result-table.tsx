"use client";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Alternative } from "@/lib/types";
import { createColumns } from "./columns";

/**
 * Props for ResultTable component
 */
interface ResultTableProps {
  /** Array of tourism destinations with TOPSIS scores, sorted by rank */
  results: readonly Alternative[];
  /** Callback when edit button is clicked */
  onEdit?: (alternative: Alternative) => void;
  /** Callback when delete button is clicked */
  onDelete?: (alternativeId: string) => void;
}

/**
 * Result Table Component
 *
 * Displays detailed ranking table with all evaluated tourism destinations using TanStack Table.
 * Shows rank, name, final score, and criteria values with visual indicators.
 *
 * Features:
 * - Sortable columns with TanStack Table
 * - Rank badges with special styling for top 3
 * - User-submitted destinations highlighted in blue
 * - Score visualization with progress bars
 * - Criteria values displayed as metadata
 * - Edit and delete actions
 *
 * @component
 */
export function ResultTable({ results, onEdit, onDelete }: ResultTableProps) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([
    { id: "rank", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = createColumns(onEdit, onDelete);

  const table = useReactTable({
    data: results as Alternative[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <div className="relative w-full md:w-64">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            aria-label="Filter tabel destinasi wisata"
            className="rounded-xl border-gray-200 bg-white pl-10"
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            placeholder="Cari destinasi wisata..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className={`h-12 bg-gray-50 ${
                        (
                          header.column.columnDef.meta as
                            | { className?: string }
                            | undefined
                        )?.className || ""
                      }`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="group/row border-gray-100 transition-colors hover:bg-gray-50/50"
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={`p-4 ${
                          (
                            cell.column.columnDef.meta as
                              | { className?: string }
                              | undefined
                          )?.className || ""
                        }`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={columns.length}
                  >
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="bg-gray-50 py-3" colSpan={columns.length}>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="font-semibold">Keterangan:</span>
                    <span className="font-mono">DT = Daya Tarik</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-mono">F = Fasilitas</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-mono">KL = Kualitas Layanan</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
