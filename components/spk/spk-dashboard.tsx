"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { INITIAL_ALTERNATIVES } from "@/lib/spk-data";
import { calculateTOPSIS } from "@/lib/topsis";
import type { Alternative } from "@/lib/types";
import { RankingChart } from "./ranking-chart";
import { ResultTable } from "./result-table";
import { UserInputForm } from "./user-input-form";

export function SpkDashboard() {
  const [userAlternatives, setUserAlternatives] = useState<Alternative[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSubmit = (alt: Alternative) => {
    // Replace any existing 'isUserObj' alternative with the new one to avoid clutter.
    const nonUser = userAlternatives.filter((a) => !a.isUserObj);
    setUserAlternatives([...nonUser, alt]);
    setIsModalOpen(false); // Close modal on submit
  };

  const { results } = useMemo(() => {
    const allAlternatives = [...INITIAL_ALTERNATIVES, ...userAlternatives];
    const topsisResult = calculateTOPSIS(allAlternatives);

    let finalResults = topsisResult.alternatives;

    if (searchQuery) {
      finalResults = finalResults.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return {
      results: finalResults,
      calculationDetails: topsisResult,
    };
  }, [userAlternatives, searchQuery]);

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
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
                <UserInputForm
                  onClose={() => setIsModalOpen(false)}
                  onSubmitUser={handleUserSubmit}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="font-bold text-2xl text-gray-800">
                Hasil Rekomendasi
              </h2>
              <p className="text-gray-500 text-sm">
                Berdasarkan metode TOPSIS (Total Score Scaled)
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                className="rounded-xl border-gray-200 bg-white pl-10"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari wisata..."
                value={searchQuery}
              />
            </div>
          </div>
          <RankingChart results={results} />
          <ResultTable results={results} />
        </div>
      </div>
    </div>
  );
}
