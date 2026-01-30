"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Error boundary component for the application
 * Catches and displays errors that occur during rendering
 * Following Next.js 16 and React 19.2 error handling patterns
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            Maaf, terjadi kesalahan saat memuat aplikasi. Silakan coba lagi.
          </p>
          {error.message && (
            <details className="rounded-lg bg-gray-100 p-3">
              <summary className="cursor-pointer font-medium text-gray-700 text-sm">
                Detail Kesalahan
              </summary>
              <p className="mt-2 font-mono text-gray-600 text-xs">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-1 font-mono text-gray-500 text-xs">
                  ID: {error.digest}
                </p>
              )}
            </details>
          )}
          <Button
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
            onClick={reset}
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
