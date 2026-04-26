"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import ItemCard from "@/components/item-card";

export default function PrelovedApp() {
  const { items, isMounted } = useApp();
  const router = useRouter();

  // Helper Format Rupiah
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const handleClickDetail = (id: string | number) => {
    router.push(`/product/${id}`);
  };

  // Proteksi Hydration (Sangat penting di Next.js)
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-indigo-900 text-white py-12 mb-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tighter">
              Beri Kesempatan Kedua Untuk Barangmu.
            </h2>
            <p className="text-indigo-200 text-lg">
              Platform terpercaya jual beli barang preloved berkualitas di Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        
        {/* Jika items ada isinya, tampilkan. Jika tidak, tampilkan loading/pesan kosong */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} isProfilePage={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-medium">
            <p>Belum ada produk yang tersedia...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}