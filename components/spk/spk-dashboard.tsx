"use client";

import { Award, MapPin, Plus, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Card Rekomendasi Utama */}
            <Card className="relative overflow-hidden rounded-xl border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm lg:col-span-1">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-200 opacity-50" />
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 shadow-green-200 shadow-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-green-800 text-lg">
                    Rekomendasi Utama
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.length > 0 ? (
                  <>
                    <div>
                      <h3 className="font-bold text-2xl text-gray-800">
                        {results[0].name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Ciwidey, Bandung</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Skor</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-green-600 text-lg">
                            {((results[0].score ?? 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Runner-up Section */}
                    {results.length > 1 && (
                      <div className="border-gray-200 border-t pt-4">
                        <p className="mb-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
                          Runner-up
                        </p>
                        <div className="space-y-2">
                          {results.slice(1, 3).map((alt, idx) => (
                            <div
                              className="flex items-center justify-between rounded-lg bg-white/70 p-2.5"
                              key={alt.id}
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 text-xs">
                                  {idx + 2}
                                </span>
                                <span className="font-medium text-gray-700 text-sm">
                                  {alt.name}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-500 text-sm">
                                {((alt.score ?? 0) * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Tidak ada data untuk ditampilkan.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Chart */}
            <div className="lg:col-span-2">
              <RankingChart results={results} />
            </div>
          </div>

          <ResultTable results={results} />
        </div>
      </div>
    </div>
  );
}
