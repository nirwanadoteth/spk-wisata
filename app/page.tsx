import type { Metadata } from "next";
import { SpkDashboard } from "@/components/spk/spk-dashboard";

export const metadata: Metadata = {
  title: "Dashboard Rekomendasi",
  description:
    "Dashboard interaktif untuk menemukan rekomendasi destinasi wisata alam di kawasan Ciwidey menggunakan metode TOPSIS. Evaluasi berdasarkan aksesibilitas, daya tarik, fasilitas, dan kualitas layanan.",
};

export default function Page() {
  return <SpkDashboard />;
}
