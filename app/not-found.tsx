import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 404 Not Found page
 * Shown when a route is not found
 * Following Next.js 16 conventions
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <FileQuestion className="h-16 w-16 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">Halaman Tidak Ditemukan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Maaf, halaman yang Anda cari tidak ditemukan.
          </p>
          <Link href="/">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Kembali ke Beranda
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
