import { Spinner } from "@/components/ui/spinner";

/**
 * Loading UI for the application
 * Shown while the page is being fetched and rendered
 * Following Next.js 16 best practices for loading states
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-green-600" />
        <p className="text-gray-600 text-sm">Memuat data wisata...</p>
      </div>
    </div>
  );
}
