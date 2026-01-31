"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Pencil,
  Trash2,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Alternative } from "@/lib/types";

/**
 * Get sort icon based on sort state
 */
const getSortIcon = (isSorted: false | "asc" | "desc") => {
  if (isSorted === "asc") {
    return <ArrowUp className="ml-2 h-3.5 w-3.5" />;
  }
  if (isSorted === "desc") {
    return <ArrowDown className="ml-2 h-3.5 w-3.5" />;
  }
  return <ChevronsUpDown className="ml-2 h-3.5 w-3.5" />;
};

export const createColumns = (
  onEdit?: (alternative: Alternative) => void,
  onDelete?: (alternativeId: string) => void
): ColumnDef<Alternative>[] => [
  {
    accessorKey: "score",
    id: "rank",
    size: 80,
    maxSize: 80,
    meta: {
      className: "w-20",
    },
    header: ({ column }) => {
      return (
        <Button
          className="h-8 px-2 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Rank
          {getSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    cell: ({ row }) => {
      const rank = row.index + 1;

      let bgClass = "bg-gray-50 text-gray-500";
      if (rank === 1) {
        bgClass = "bg-yellow-100 text-yellow-700";
      } else if (rank === 2) {
        bgClass = "bg-gray-100 text-gray-600";
      } else if (rank === 3) {
        bgClass = "bg-orange-100 text-orange-600";
      }

      return (
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm ${bgClass}`}
        >
          {rank <= 3 ? <Trophy className="h-4 w-4" /> : `#${rank}`}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="h-8 px-2 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Destinasi
          {getSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    cell: ({ row }) => {
      const alt = row.original;
      return (
        <div>
          <div className="flex items-center gap-2 font-semibold text-base text-gray-900">
            {alt.name}
          </div>
          <div className="mt-0.5 font-mono text-gray-400 text-xs">
            KAJ: {alt.c2.toFixed(1)} | KF: {alt.c3.toFixed(1)} | KB:{" "}
            {alt.c4.toFixed(1)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="h-8 px-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="ghost"
          >
            Skor Akhir
            {getSortIcon(column.getIsSorted())}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const score = row.original.score || 0;
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold font-mono text-base text-green-600">
            {score.toFixed(4)}
          </span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${score * 100}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "c1",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            className="h-8 px-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="ghost"
          >
            Keindahan Alam
            {getSortIcon(column.getIsSorted())}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-mono text-gray-600">
          {row.original.c1.toFixed(2)}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const alt = row.original;
      return (
        <div className="flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover/row:opacity-100">
          <Button
            className="h-8 w-8 border-blue-200 p-0 text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => onEdit?.(alt)}
            size="sm"
            variant="outline"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            className="h-8 w-8 border-red-200 p-0 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete?.(alt.id)}
            size="sm"
            variant="outline"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      );
    },
  },
];
