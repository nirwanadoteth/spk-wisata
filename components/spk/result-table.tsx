import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Alternative } from "@/lib/types";

interface ResultTableProps {
  results: readonly Alternative[];
}

export function ResultTable({ results }: ResultTableProps) {
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
                <TableHead className="w-[80px] text-center font-semibold text-gray-600 text-xs uppercase">
                  Rank
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase">
                  Nama Wisata
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-600 text-xs uppercase">
                  Nilai Akhir
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-600 text-xs uppercase">
                  Aksesibilitas
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50">
              {results.map((alt, index) => {
                // Rank styling
                let rankBadgeClass = "bg-gray-100 text-gray-600";
                if (index === 0) {
                  rankBadgeClass = "bg-yellow-100 text-yellow-700 shadow-sm";
                }
                if (index === 1) {
                  rankBadgeClass = "bg-gray-100 text-gray-700 shadow-sm";
                }
                if (index === 2) {
                  rankBadgeClass = "bg-orange-50 text-orange-700 shadow-sm";
                }
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
                        #{index + 1}
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
