"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { INITIAL_ALTERNATIVES } from "@/lib/spk-data";
import { calculateTOPSIS } from "@/lib/topsis";
import type { Alternative } from "@/lib/types";
import { CriteriaBreakdown } from "./criteria-breakdown";
import { CriteriaWeightDisplay } from "./criteria-weight-display";
import { ResultTable } from "./result-table";
import { StatsWidget } from "./stats-widget";
import { TopRecommendations } from "./top-recommendations";
import { UserInputForm } from "./user-input-form";

/**
 * SPK Dashboard Component
 *
 * Main dashboard for the Tourism Decision Support System.
 * Provides TOPSIS-based recommendations for tourism destinations in Ciwidey.
 *
 * Features:
 * - Display top recommendations with ranking
 * - Add user-defined destinations for comparison
 * - Real-time search filtering
 * - Interactive charts and tables
 *
 * @component
 * @example
 * ```tsx
 * <SpkDashboard />
 * ```
 */
export function SpkDashboard() {
  // Gabungkan data awal dengan data user input seperti di project referensi
  const [data, setData] = useState<Alternative[]>(INITIAL_ALTERNATIVES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlternative, setEditingAlternative] =
    useState<Alternative | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /**
   * Handles submission of user-defined tourism destination
   * Menambahkan destinasi baru ke dalam data
   */
  const handleUserSubmit = (alt: Alternative) => {
    setData((prev) => [...prev, alt]);
    setIsModalOpen(false);
  };

  /**
   * Handles editing of an existing user-submitted destination
   * Updates the alternative with new values while preserving id
   */
  const handleEdit = (alt: Alternative) => {
    setEditingAlternative(alt);
    setIsModalOpen(true);
  };

  /**
   * Handles update of an edited destination
   * Replaces the old alternative with the updated one
   */
  const handleUpdate = (updatedAlt: Alternative) => {
    setData((prev) =>
      prev.map((a) => (a.id === updatedAlt.id ? updatedAlt : a))
    );
    setEditingAlternative(null);
    setIsModalOpen(false);
  };

  /**
   * Handles deletion of a user-submitted destination
   * Removes the alternative from the list after confirmation
   */
  const handleDelete = (alternativeId: string) => {
    setDeleteTargetId(alternativeId);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirms and executes the deletion
   */
  const confirmDelete = () => {
    if (deleteTargetId) {
      setData((prev) => prev.filter((a) => a.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
    setIsDeleteDialogOpen(false);
  };

  /**
   * Calculate TOPSIS results without filtering
   * React 19.2 note: With React Compiler enabled, manual memoization is less
   * critical, but we keep useMemo for expensive TOPSIS calculations
   */
  const { results } = useMemo(() => {
    // Data sudah berisi gabungan initial + user input
    // Run TOPSIS algorithm to calculate preference scores
    const topsisResult = calculateTOPSIS(data);

    return {
      results: topsisResult.alternatives,
      calculationDetails: topsisResult,
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      <div className="sticky top-0 z-30 border-gray-200 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 font-bold text-lg text-white shadow-green-200 shadow-lg">
              C
            </div>
            <h1 className="font-bold text-gray-800 text-xl tracking-tight">
              Ciwidey<span className="text-green-600">SPK</span>
            </h1>
          </div>
          <div>
            <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
              <DialogTrigger
                render={
                  <Button className="gap-2 bg-green-600 text-white hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                    Tambah Wisata
                  </Button>
                }
              />
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
                <UserInputForm
                  existingData={editingAlternative ?? undefined}
                  onClose={() => {
                    setIsModalOpen(false);
                    setEditingAlternative(null);
                  }}
                  onSubmitUser={
                    editingAlternative ? handleUpdate : handleUserSubmit
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div>
            <h2 className="font-bold text-gray-800 text-xl">
              Hasil Rekomendasi
            </h2>
            <p className="text-gray-500 text-xs">Berdasarkan metode TOPSIS</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {/* Card Rekomendasi Top 3 */}
            <TopRecommendations results={results} />

            {/* Bobot Kriteria */}
            <CriteriaWeightDisplay />

            {/* Stats Widget */}
            <StatsWidget results={results} />

            {/* Breakdown Kriteria */}
            <CriteriaBreakdown results={results} />
          </div>

          <ResultTable
            onDelete={handleDelete}
            onEdit={handleEdit}
            results={results}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Data ini akan dihapus secara permanen dan tidak dapat dikembalikan
              lagi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
